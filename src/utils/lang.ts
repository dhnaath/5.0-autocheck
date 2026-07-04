export const translations: Record<string, any> = {
  id: new Proxy({}, {
    get: (target, prop) => {
      if (typeof prop === "symbol" || prop === "hasOwnProperty" || prop === "toString" || prop === "valueOf" || prop === "then") {
        return Reflect.get(target, prop);
      }
      if (typeof prop === "string") {
        const fallback: Record<string, string> = {
          weekly_spent: "Minggu Ini",
          monthly_spent: "Bulan Ini",
          volume: "Total Volume",
          prev_distance: "Jarak Tempuh",
          odo_prev_progress: "Odo: {val}",
          odo_not_recorded: "Belum tercatat",
          expected_distance: "Estimasi Jarak",
          expected_range_hint: "Jarak sisa",
          alert_default: "Perhatian",
          toast_fill_fields: "Isi semua bidang",
          toast_odo_error: "Odometer salah {val}",
          toast_bar_error: "Bar BBM salah {val}",
          income_delete: "Hapus pemasukan?",
          confirm_wipe: "Hapus data?",
          wipe_success: "Sukses",
          active_profile_lbl: "Profil BBM Aktif",
          opsi_price: "Harga per Liter",
          placeholder_price: ".....",
          opsi_volume: "Volume (Liter)",
          placeholder_volume: ".....",
          opsi_slider: "Indikator Bar",
          trip_title: "Simulasi Trip",
          trip_fuel_type: "BBM Dipakai",
          trip_price_unit: "Rp/Liter",
          trip_distance_lbl: "Jarak Tempuh",
          trip_distance_placeholder: "Km",
          trip_calc_empty: "Belum ada hitungan",
          sett_lang_format: "Bhs",
          sett_lang: "Bahasa",
          sett_vol: "Satuan Vol",
          sett_currency: "Mata Uang",
          sett_sep: "Pemisah Angka",
          sett_sep_dot: "Titik",
          sett_sep_comma: "Koma",
          sett_fuel_profiles: "Pilih BBM",
          sett_add_profile: "Tambah BBM",
          sett_vehicle: "Kendaraan",
          sett_tank_capacity: "Kapasitas Tangki",
          sett_max_bars: "Max Bar di Speedometer",
          sett_efficiency_factor: "Perkiraan Konsumsi",
          btn_sett: "Pengaturan",
          btn_wipe: "Hapus Semua Data",
          modal_title: "Isi Data Baru",
          modal_step: "Langkah",
          modal_prev_odo_label: "Odo Sebelumnya",
          modal_prev_odo_placeholder: "Km sebelumnya",
          odo_awal_msg: "Odometer awal: {val} km",
          modal_new_bar_label: "Posisi Indikator",
          modal_efficiency_label: "Estimasi {val} km/L",
          modal_efficiency_placeholder: "Km/L",
          modal_cancel: "Batal",
          modal_next: "Lanjut",
          modal_finish: "Selesai",
          income_modal_title: "Catat Pemasukan",
          expense_modal_title: "Catat Pengeluaran",
          income_rate_label: "Tarif Tempuh (Rp)",
          income_distance_label: "Jarak Tempuh (Km)",
          income_other_cost_label: "Biaya Lain (Rp)",
          income_total_label: "Total Pendapatan (Rp)",
          income_date_label: "Tanggal",
          income_notes_label: "Keterangan",
          expense_odo_label: "Odometer",
          expense_distance_label: "Jarak Tempuh (Km)",
          expense_other_cost_label: "Biaya Lain (Rp)",
          expense_cost_label: "Total Pengeluaran (Rp)",
          expense_notes_label: "Keterangan",
          cancel_btn: "Batal",
          save_btn: "Simpan"
        };
        return fallback[prop] || prop.replace(/_/g, " ");
      }
      return undefined;
    }
  }),
  en: new Proxy({}, {
    get: (target, prop) => {
      if (typeof prop === "symbol" || prop === "hasOwnProperty" || prop === "toString" || prop === "valueOf" || prop === "then") {
        return Reflect.get(target, prop);
      }
      if (typeof prop === "string") {
         return prop.replace(/_/g, " ");
      }
      return undefined;
    }
  })
};
