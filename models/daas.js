const mongoose = require("mongoose");

const IndividualTokenSchemaFromAnalyzeResponse = new mongoose.Schema({
  token: {
    type: [String],
    required: true,
  },
  start_offset: {
    type: Number,
    required: true,
  },
  end_offset: {
    type: Number,
    required: true,
  },
});

const DaasSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
    },
    data_received: {
      type: [IndividualTokenSchemaFromAnalyzeResponse],
      required: false,
    },
  },
  { timestamps: true }
);

const Daas = mongoose.model("Daas", DaasSchema);
module.exports = Daas;
