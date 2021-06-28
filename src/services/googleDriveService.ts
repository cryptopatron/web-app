import axios, { AxiosPromise } from "axios";

export class GoogleDriveService {
  public static CLIENT_ID =
    "48709226407-vuriktl4ub77gl5ifbsbsm3d2jnrshvt.apps.googleusercontent.com";
  public static DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.appdata";

  private accessToken: string | undefined;

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  public uploadFile(fileName: string, fileContents: string): Observable<any> {
    const file = new Blob([fileContents], { type: "text/plain" });
    const metadata = {
      name: fileName,
      mimeType: "text/plain",
      parents: ["appDataFolder"],
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    return this.httpClient.post<any>(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
      form,
      { headers: { Authorization: `Bearer ${this.accessToken}` } }
    );
  }

  public listFiles(fileName: string): Promise<AxiosPromise> {
    let params = {
      q: `name = '${fileName}'`,
      pageSize: "100",
      fields: "files(id, name)",
      spaces: "appDataFolder",
    };

    return axios.get(`https://www.googleapis.com/drive/v3/files`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: params,
    });
  }

  public getFile(fileId: string): Promise<AxiosPromise> {
    return axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        alt: "media",
      },
    });
  }
}
