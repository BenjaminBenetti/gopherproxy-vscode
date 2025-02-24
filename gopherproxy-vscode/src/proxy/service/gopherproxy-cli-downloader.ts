import axios from "axios";
import * as os from "os";
import * as fs from "fs";
import * as vscode from "vscode";
import path from "path";

export class GopherProxyCliDownLoader {
  public static readonly GopherProxyLatestReleaseUrl =
    "https://api.github.com/repos/BenjaminBenetti/gopherproxy/releases/latest";

  // =======================================
  // Public Methods
  // =======================================

  /**
   * Ensures that the most recent version of the GopherProxy CLI is downloaded and available for use.
   * If the most recent version is already downloaded, this method does nothing.
   * If the most recent version is not downloaded, this method will download it.
   * @param context - the vscode extension context. Will be used to get the extension data directory.
   * @returns - fs path to the downloaded GopherProxy CLI.
   */
  public async ensureMostRecentGopherProxyCli(
    context: vscode.ExtensionContext
  ): Promise<string> {
    const downloadLink = await this.getDownloadLink(
      GopherProxyCliDownLoader.GopherProxyLatestReleaseUrl
    );

    //technically we should check to see if we have already donwloaded... but,
    // it's only 12MB, so just download it every time.
    return this.downloadGopherProxyCli(downloadLink, context);
  }

  // =======================================
  // Private Methods
  // =======================================

  /**
   * Download the GopherProxy CLI from the specified download link.
   * @param downloadLink - The download link for the GopherProxy CLI.
   * @param context - The vscode extension context. Will be used to get the extension data directory.
   * @return - fs path to the downloaded GopherProxy CLI.
   */
  private async downloadGopherProxyCli(
    downloadLink: string,
    context: vscode.ExtensionContext
  ): Promise<string> {
    const gopherProxyCli = await axios.get(downloadLink, {
      responseType: "arraybuffer",
    });
    if (gopherProxyCli.status !== 200) {
      throw new Error(
        `Error downloading GopherProxy CLI. Status: ${gopherProxyCli.status}`
      );
    }

    if (context.storageUri?.fsPath) {
      const cliPath = path.join(context.storageUri.fsPath, "gopherproxy");
      fs.mkdirSync(context.storageUri.fsPath, { recursive: true });
      fs.writeFileSync(cliPath, gopherProxyCli.data, { mode: "777" });

      return cliPath;
    } else {
      throw new Error(
        "Error downloading GopherProxy CLI. Could not get vscode extension storage directory"
      );
    }
  }

  /**
   * Get download link for the specified release. Taking in to account
   * the current platform and architecture.
   * @param releaseUrl - The url of the release to get download links for.
   * @returns - The download links for the release.
   */
  private async getDownloadLink(releaseUrl: string): Promise<string> {
    const response = await axios.get(releaseUrl);
    if (response.status !== 200) {
      throw new Error(
        `Error when getting download links for release! Status: ${response.status}`
      );
    }
    const releaseInfo = response.data;

    let archExtension = ".x86";
    switch (os.arch()) {
      case "arm64":
      case "arm":
        archExtension = ".arm";
        break;
    }

    let osExtension = ""; // linux
    switch (os.platform()) {
      case "win32":
        osExtension = ".exe"; // windows
        break;
    }

    for (const asset of releaseInfo.assets) {
      if ((asset.name as string).endsWith(archExtension + osExtension)) {
        return asset.browser_download_url;
      }
    }

    throw new Error(
      `Could not find download link for platform: ${os.platform()} and architecture: ${os.arch()}`
    );
  }
}
