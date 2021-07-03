import Web3 from "web3";
import { GoogleDriveService } from "./googleDriveService";

export class WalletGenerationService {
  private static NETWORK_URL = "https://rpc-mumbai.maticvigil.com";

  constructor(private googleDriveService: GoogleDriveService) {}

  private generateWallet() {
    // Connect to matic testnet
    const web3 = new Web3(
      new Web3.providers.HttpProvider(WalletGenerationService.NETWORK_URL)
    );
    // Generate a random public-private key pair
    // TODO: Security can be vastly improved with Seeded or HD wallets
    return web3.eth.accounts.create();
  }

  private secureStoreWallet(wallet, accessToken): boolean {
    //connect to Google drive and store wallet credentials
    // Return true if success
    this.googleDriveService.setAccessToken(accessToken);
    let res = this.googleDriveService.uploadFile(
      `${WalletGenerationService.NETWORK_URL}.json`,
      JSON.stringify(wallet)
    );
    res
      .then(() => {
        console.log("Wallet stored successfully!");
        return true;
      })
      .catch(() => {
        console.log("Wallet storage failed");
      });
    return false;
  }

  public setupMaticWallet(): string {
    let wallet = this.generateWallet();
    // TODO: Where do we get Drive access token from?
    if (this.secureStoreWallet(wallet, driveAccessToken)) {
      return wallet.address;
    } else {
      return "";
    }
  }
}
