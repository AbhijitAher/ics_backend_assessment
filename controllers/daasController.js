const { default: mongoose } = require("mongoose");
const Daas = require("../models/daas");
const { default: axios } = require("axios");
require("dotenv").config();

// Not added due to security reasons
const daas_api_key = process.env.DAAS_API_KEY;

const analyzeQueryAndSaveToDB = async (req, res) => {
  const { query } = req.body;
  try {
    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid query" });
    }

    if (!daas_api_key) {
      return res.status(500).json({ message: "API key is not configured" });
    }

    // call daas api to get the response
    let response = await axios.post(
      `https://staging.daas.innoplexus.de/api/v2/analyse?api_key=${daas_api_key}`,
      {
        query: query,
      }
    );

    // save the response to the database
    let { data } = response;

    // check if data is present or not
    if (data) {
      let dummy_query = "lung carcinoma, breast cancer";
      let dummy_data = {
        data: [
          {
            token: ["dummy_token"],
            start_offset: 0,
            end_offset: 14,
          },
          {
            token: ["dummy_token1", "dummy_token2"],
            start_offset: 16,
            end_offset: 29,
          },
        ],
      };
      const newDaasDummyResponse = new Daas({ dummy_query, data_received: dummy_data.data });
      const newDaasResponse = new Daas({ query, data_received: data });
      await newDaasResponse.save();
      res.status(201).json(newDaasResponse);
    } else {
      res.status(204).json({ message: "No data returned from API" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  analyzeQueryAndSaveToDB,
};
