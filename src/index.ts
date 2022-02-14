const hostDefault = "https://etherscan.finy.ch/api";

interface Addresses {
  solana?: string;
  ethereum?: string;
}

class Client {
  host: string;

  /**
   *
   * @param clientId client id
   * @param addresses crypto addresses (ethereum, solana etc)
   * @param host
   */
  constructor(
    clientId: string,
    addresses: Addresses,
    host: string = hostDefault
  ) {
    this.host = host;

    this.insert({
      clientId,
      solana: addresses.solana,
      ethereum: addresses.ethereum,
    });
  }

  insert = async (payload: {
    clientId: string;
    solana?: string;
    ethereum?: string;
  }): Promise<{ reponse: true }> => {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(payload);
    const method = "POST";

    const url = this.host + "/analytics/insert";

    const r = await fetch(url, {
      method,
      body,
      headers,
    });

    if (r.status !== 200) {
      throw Error("something went wrong, could not insert");
    }

    return r.json();
  };
}

export default Client;
