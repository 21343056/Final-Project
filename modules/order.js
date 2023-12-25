const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id_pelanggan: {
    type: String,
    required: true,
    unique: true,
  },

  nama_pelanggan: {
    type: String,
    required: true,
    unique: true,
  },
  merek_sepatu: {
    type: String,
    required: true,
  },
  tipe_sepatu: {
    type: String,
    required: true,
  },
  warna_sepatu: {
    type: String,
    required: true,
  },
  jenis_layanan: {
    type: String,
    required: true,
  },
  total_bayar: {
    type: Number,
    required: true,
  },
  tanggal_transaksi: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
