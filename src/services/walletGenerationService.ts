import Web3 from "web3";
import { GoogleDriveService } from "./googleDriveService";

export class WalletGenerationService {
  private static NETWORK_URL = "https://rpc-mumbai.maticvigil.com";

  private googleDriveService = new GoogleDriveService();

  private generateWallet() {
    // Connect to matic testnet
    const web3 = new Web3(
      new Web3.providers.HttpProvider(WalletGenerationService.NETWORK_URL)
    );
    // Generate a random public-private key pair
    // TODO: Security can be vastly improved with Seeded or HD wallets
    return web3.eth.accounts.create();
  }

  private async secureStoreWallet(wallet, accessToken): Promise<string> {
    //connect to Google drive and store wallet credentials
    // Return true if success
    this.googleDriveService.setAccessToken(accessToken);
    try {
      const result = await this.googleDriveService.uploadFile(
        `${WalletGenerationService.NETWORK_URL}.json`,
        JSON.stringify(wallet)
      );
      console.log("Wallet stored successfully!");
      return wallet.address;
    } catch (error) {
      console.log("Wallet storage failed");
      console.log(error);
    }
    return "";
  }

  public setupMaticWallet(driveAccessToken: string): any {
    let wallet = this.generateWallet();
    return this.secureStoreWallet(wallet, driveAccessToken);
  }
}
