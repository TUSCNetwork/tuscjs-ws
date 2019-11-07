var config = {
  core_asset: "TUSC",
  address_prefix: "TUSC",
  expire_in_secs: 15,
  expire_in_secs_proposal: 24 * 60 * 60,
  review_in_secs_committee: 24 * 60 * 60,
  networks: {
    TUSC: {
      core_asset: "TUSC",
      address_prefix: "TUSC",
      chain_id:
        "5a64159ecf7214e8d072712ed9341cda01d9a8d9f8d6ac554decb41542497168"
    },
    Muse: {
      core_asset: "MUSE",
      address_prefix: "MUSE",
      chain_id:
        "45ad2d3f9ef92a49b55c2227eb06123f613bb35dd08bd876f2aea21925a67a67"
    },
    Test: {
      core_asset: "TUSC",
      address_prefix: "TUSC",
      chain_id:
        "2f3b0eda49110b33e8992da47c73f96db7b8cf28e68d5dabf7e39e48a69371ed"
    },
    Obelisk: {
      core_asset: "GOV",
      address_prefix: "FEW",
      chain_id:
        "1cfde7c388b9e8ac06462d68aadbd966b58f88797637d9af805b4560b0e9661e"
    }
  },

  /** Set a few properties for known chain IDs. */
  setChainId: chain_id => {
    let result = Object.entries(config.networks).find(
      ([network_name, network]) => {
        if (network.chain_id === chain_id) {
          config.network_name = network_name;

          if (network.address_prefix) {
            config.address_prefix = network.address_prefix;
          }
          return true;
        }
      }
    );

    if (result) return { network_name: result[0], network: result[1] };
    else console.log("Unknown chain id (this may be a testnet)", chain_id);
  },

  reset: () => {
    config.core_asset = "TUSC";
    config.address_prefix = "TUSC";
    config.expire_in_secs = 15;
    config.expire_in_secs_proposal = 24 * 60 * 60;

    console.log("Chain config reset");
  },

  setPrefix: (prefix = "TUSC") => (config.address_prefix = prefix)
};

export default config;
