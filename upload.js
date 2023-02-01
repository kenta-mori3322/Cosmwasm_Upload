const { calculateFee, GasPrice, isMsgSubmitProposalEncodeObject } = require("@cosmjs/stargate");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { SigningCosmWasmClient, CosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const _ = require("fs");

const rpcEndpoint = "http://142.132.197.4:26657";
// const rpcEndpoint = "http://localhost:26657";

const sender = {
    mnemonic: "betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire",
    address: "human1dfjns5lk748pzrd79z4zp9k22mrchm2axtg8at",
};

async function uploadMain() {
    const escrowWasmPath = "./RSA_VERIFY.wasm";
    const gasPrice = GasPrice.fromString("0.05uheart");

    // Upload contract
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "human" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const wasm = await _.readFileSync(escrowWasmPath);
    const uploadFee = await calculateFee(5_000_0000, gasPrice);
    const uploadVault = await sender_client.upload(sender.address, wasm, uploadFee, "Upload cw20base contract");
    console.log("Upload succeeded. Receipt:", uploadVault);
    return uploadVault.codeId;
}

async function getBalance() {
    // Upload contract
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "mun" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const balance = await sender_client.queryContractSmart("mun1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrsfttf7h",
    {
        balance:{
            address:"mun1a42p9hjfw5v28u7rffq2tt9u75n6puy5d2qtvr"
        }
    })
    console.info(`DGM balance: `, balance);

    return balance;
}

async function instantiateMain(codeId) {
    // // Instantiate
    const gasPrice = GasPrice.fromString("0.05utmun");
    const instantiateFee = calculateFee(500_000, gasPrice);
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "mun" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const initMsg = {
        name: "DOGEMUN",
        symbol: "DGM",
        decimals: 6,
        initial_balances: [
             {
                address: "mun1dfjns5lk748pzrd79z4zp9k22mrchm2a7ym0yh",
                amount: "5000000000000",
            },
            
        ],
        mint: {minter:"mun1dfjns5lk748pzrd79z4zp9k22mrchm2a7ym0yh"}
    };

    const { contractAddress } = await sender_client.instantiate(
        sender.address,
        codeId,
        initMsg,
        "MUN",
        instantiateFee,
        { memo: `Create a hackatom instance` },
    );
    console.info(`Contract instantiated at: `, contractAddress);

}

async function sendTokens() {
    const gasPrice = GasPrice.fromString("0.05utmun");
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "mun" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const executeFee = calculateFee(300_000, gasPrice);
    const msg =
    {
        transfer: {
            recipient: "mun1a42p9hjfw5v28u7rffq2tt9u75n6puy5d2qtvr",
            amount: "500000000"
        }

    }

    const create_result = await sender_client.execute(
        sender.address,
        "mun1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrsfttf7h",
        msg,
        executeFee,
        "",
    );
    console.log("SetMaximumNum", create_result)

}
const InstantiateContract = async (codeId) => {
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "human" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    console.log("come in this function");
    const gasPrice = GasPrice.fromString("0.05uheart");
    const instantiateFee = calculateFee(700_000, gasPrice);
  
    console.log(typeof ("0xB793F2F926170FAD768F8B1A5769A2243B4CDCAC4780194F59B39E1A2ABC3BB8EA42DB495D17BEC7F7072A11ED4FA510E75A7886A5DB6F71B7AFCA0090CA079889D18AF0669829ED29A8E21D0C09BD19CAAF2FE2CC8121BFC5687AC6698E3022F468A481426486CAD263BE1A119491E034A6E1AB78F19C066D4145A50F9ECFF7"))
  
    const msg = {
      admin: sender.address,
      denom: "uheart",
      pubkey: {
        n: "0xB793F2F926170FAD768F8B1A5769A2243B4CDCAC4780194F59B39E1A2ABC3BB8EA42DB495D17BEC7F7072A11ED4FA510E75A7886A5DB6F71B7AFCA0090CA079889D18AF0669829ED29A8E21D0C09BD19CAAF2FE2CC8121BFC5687AC6698E3022F468A481426486CAD263BE1A119491E034A6E1AB78F19C066D4145A50F9ECFF7",
        e: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
      }
    };
    const { contractAddress } = await sender_client.instantiate(
      sender.address,
      codeId,
      msg,
      "RSA_Verify",
      instantiateFee,
    );
    console.info(`Contract instantiated at: `, contractAddress);
    return contractAddress;
  }
  

uploadMain()
// InstantiateContract(1)
// instantiateMain(1)
// getBalance()
//sendTokens()