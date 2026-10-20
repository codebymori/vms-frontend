# Dokumentasi ButtonComponent.jsx

**Project:** CCTV Monitor — Sekolah Karakter Podomoro  
**Lokasi file:** `src/components/common/ButtonComponent.jsx`  
**Teknologi:** React JS, Tailwind CSS, Lucide React, React Router DOM

## 1. Tujuan

`ButtonComponent.jsx` adalah reusable component untuk membuat tombol dengan tampilan dan perilaku yang fleksibel.

Component ini mendukung:
- Mengatur warna background, teks, dan border.
- Memilih variasi tombol.
- Menampilkan icon di sebelah kiri atau kanan teks.
- Mengatur ukuran tombol.
- Membuka modal atau menjalankan fungsi melalui `onClick`.
- Berpindah halaman melalui `to`.
- Menonaktifkan tombol menggunakan `disabled`.
- Menambahkan class Tailwind melalui `className`.

## 2. Import Component

Gunakan import berikut pada page atau component yang membutuhkan tombol.

```jsx
import ButtonComponent from "../components/common/ButtonComponent";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
```

Sesuaikan path import dengan lokasi file pemanggil.

## 3. Daftar Props

| Props | Tipe | Default | Keterangan |
|---|---|---|---|
| `children` | ReactNode | — | Teks atau konten tombol |
| `variant` | string | `"primary"` | Pilihan gaya tombol |
| `bgColor` | string | Sesuai variant | Warna background custom |
| `textColor` | string | Sesuai variant | Warna teks custom |
| `borderColor` | string | Sesuai variant | Warna border custom |
| `icon` | Component | — | Icon dari Lucide React |
| `iconPosition` | string | `"left"` | Posisi icon, `left` atau `right` |
| `iconSize` | number | `20` | Ukuran icon dalam pixel |
| `size` | string | `"md"` | Ukuran tombol: `sm`, `md`, `lg` |
| `onClick` | function | — | Fungsi ketika tombol diklik |
| `to` | string | — | URL internal React Router |
| `type` | string | `"button"` | Tipe tombol HTML |
| `disabled` | boolean | `false` | Menonaktifkan tombol |
| `title` | string | — | Tooltip atau judul tombol |
| `className` | string | `""` | Class CSS tambahan |

## 4. Pilihan Variant

### Primary

Tombol utama dengan background biru dan teks putih.

```jsx
<ButtonComponent variant="primary">
  Simpan Data
</ButtonComponent>
```

Warna default:
- Background: `#2878F0`
- Text: `#FFFFFF`
- Border: `#2878F0`

### Secondary

Tombol putih dengan border biru muda dan teks biru gelap.

```jsx
<ButtonComponent variant="secondary">
  Batal
</ButtonComponent>
```

Warna default:
- Background: `#FFFFFF`
- Text: `#315982`
- Border: `#D3E3FC`

### Outline

Tombol transparan dengan border biru.

```jsx
<ButtonComponent variant="outline">
  Lihat Detail
</ButtonComponent>
```

### Danger

Tombol untuk aksi berisiko, misalnya menghapus data.

```jsx
<ButtonComponent variant="danger">
  Hapus Data
</ButtonComponent>
```

### Ghost

Tombol minimalis tanpa background atau border yang terlihat.

```jsx
<ButtonComponent variant="ghost">
  Lewati
</ButtonComponent>
```

## 5. Mengatur Warna Custom

Gunakan `bgColor`, `textColor`, dan `borderColor` jika warna yang dibutuhkan tidak tersedia dalam variant bawaan.

```jsx
<ButtonComponent
  bgColor="#FACC15"
  textColor="#713F12"
  borderColor="#EAB308"
>
  Tambah Data
</ButtonComponent>
```

Ketiga properti warna bisa digunakan secara terpisah.

Contoh mengubah background saja:

```jsx
<ButtonComponent
  variant="secondary"
  bgColor="#F0F7FF"
>
  Filter
</ButtonComponent>
```

Properti warna custom akan mengesampingkan warna default dari `variant`.

## 6. Menggunakan Icon

Icon menggunakan komponen dari `lucide-react`.

### Icon di sebelah kiri

```jsx
<ButtonComponent
  variant="primary"
  icon={Plus}
>
  Tambah Kamera
</ButtonComponent>
```

### Icon di sebelah kanan

```jsx
<ButtonComponent
  variant="secondary"
  icon={Pencil}
  iconPosition="right"
>
  Edit Data
</ButtonComponent>
```

### Mengatur ukuran icon

```jsx
<ButtonComponent
  variant="primary"
  icon={Plus}
  iconSize={24}
>
  Tambah Lokasi
</ButtonComponent>
```

### Tombol tanpa icon

Properti `icon` cukup dihilangkan.

```jsx
<ButtonComponent variant="secondary">
  Batal
</ButtonComponent>
```

## 7. Mengatur Ukuran

### Small

```jsx
<ButtonComponent size="sm" variant="secondary">
  Edit
</ButtonComponent>
```

Cocok untuk tombol aksi pada tabel.

### Medium

```jsx
<ButtonComponent size="md" variant="primary">
  Simpan
</ButtonComponent>
```

Cocok untuk tombol standar.

### Large

```jsx
<ButtonComponent
  size="lg"
  variant="primary"
  icon={Plus}
>
  Tambah Kamera
</ButtonComponent>
```

Cocok untuk tombol utama pada header halaman, seperti tombol di halaman Settings.

## 8. Membuka Modal atau Popup

Gunakan `onClick` untuk menjalankan fungsi. State modal dikelola oleh page yang menggunakan tombol.

```jsx
import { useState } from "react";
import ButtonComponent from "../components/common/ButtonComponent";
import { Plus } from "lucide-react";

function LocationPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <ButtonComponent
        variant="secondary"
        size="lg"
        icon={Plus}
        onClick={() => setShowModal(true)}
      >
        Tambah Lokasi
      </ButtonComponent>

      {showModal && (
        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-bold">
            Tambah Lokasi
          </h2>

          <ButtonComponent
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Tutup
          </ButtonComponent>
        </div>
      )}
    </div>
  );
}

export default LocationPage;
```

Contoh di atas menggunakan panel sederhana sebagai demonstrasi. Untuk modal produksi, gunakan `ModalComponent.jsx` jika sudah tersedia.

## 9. Berpindah Halaman

Gunakan properti `to` untuk navigasi internal dengan React Router DOM.

```jsx
<ButtonComponent
  to="/monitoring"
  variant="primary"
  icon={Plus}
>
  Buka Monitoring
</ButtonComponent>
```

Contoh navigasi lain:

```jsx
<ButtonComponent to="/locations" variant="secondary">
  Kelola Lokasi
</ButtonComponent>

<ButtonComponent to="/alerts" variant="outline">
  Lihat Alert
</ButtonComponent>
```

Pastikan URL tersebut sudah didaftarkan pada konfigurasi `Routes` di `App.js`.

**Catatan:** `to` digunakan untuk navigasi halaman, sedangkan `onClick` digunakan untuk menjalankan fungsi. Hindari menggunakan keduanya untuk aksi navigasi yang sama.

## 10. Menonaktifkan Tombol

Gunakan `disabled` ketika proses belum dapat dilakukan.

```jsx
<ButtonComponent
  variant="primary"
  disabled={true}
>
  Simpan Data
</ButtonComponent>
```

Contoh dengan kondisi:

```jsx
<ButtonComponent
  variant="primary"
  disabled={!formValid}
  onClick={handleSave}
>
  Simpan Data
</ButtonComponent>
```

Ketika `formValid` bernilai `false`, tombol akan dinonaktifkan.

## 11. Tombol Submit Form

Jika tombol digunakan untuk mengirim form, atur `type="submit"`.

```jsx
<form onSubmit={handleSubmit}>
  {/* Input form */}

  <ButtonComponent
    type="submit"
    variant="primary"
    icon={Save}
  >
    Simpan
  </ButtonComponent>
</form>
```

Jangan lupa gunakan `event.preventDefault()` di `handleSubmit` jika form ditangani sepenuhnya di sisi React dan tidak boleh melakukan submit browser secara default.

## 12. Menambahkan Class Tailwind

Gunakan `className` untuk kebutuhan styling tambahan.

```jsx
<ButtonComponent
  variant="primary"
  className="w-full"
>
  Simpan Perubahan
</ButtonComponent>
```

Contoh lainnya:

```jsx
<ButtonComponent
  variant="secondary"
  className="shadow-sm"
>
  Filter Data
</ButtonComponent>
```

Perlu diingat, `className` menambahkan styling di luar class bawaan. Jika ingin mengubah warna utama, lebih baik gunakan properti warna yang tersedia.

## 13. Contoh Implementasi pada Header Settings

Contoh susunan tombol Tambah Lokasi, Tambah Area, dan Tambah Kamera seperti desain CCTV Monitor.

```jsx
import { useState } from "react";
import ButtonComponent from "../components/common/ButtonComponent";
import { Plus } from "lucide-react";

function SettingsActions() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);

  return (
    <div className="flex flex-wrap gap-4">
      <ButtonComponent
        variant="secondary"
        size="lg"
        icon={Plus}
        onClick={() => setShowLocationModal(true)}
      >
        Tambah Lokasi
      </ButtonComponent>

      <ButtonComponent
        variant="secondary"
        size="lg"
        icon={Plus}
        onClick={() => setShowAreaModal(true)}
      >
        Tambah Area
      </ButtonComponent>

      <ButtonComponent
        variant="primary"
        size="lg"
        icon={Plus}
        onClick={() => setShowCameraModal(true)}
      >
        Tambah Kamera
      </ButtonComponent>
    </div>
  );
}

export default SettingsActions;
```

State `showLocationModal`, `showAreaModal`, dan `showCameraModal` nantinya harus dihubungkan ke modal masing-masing agar tombol benar-benar menampilkan popup yang sesuai.

## 14. Standar Penggunaan dalam Project

Untuk menjaga konsistensi UI CCTV Monitor, gunakan pedoman berikut:

1. **Primary** untuk aksi utama, misalnya Simpan atau Tambah Kamera.
2. **Secondary** untuk aksi alternatif, misalnya Batal atau Tambah Lokasi.
3. **Outline** untuk aksi sekunder yang perlu terlihat menonjol.
4. **Danger** untuk aksi yang berisiko, misalnya Hapus Kamera.
5. **Ghost** untuk aksi ringan yang tidak membutuhkan kotak tombol.
6. Gunakan `size="sm"` untuk aksi tabel dan `size="lg"` untuk tombol utama di header.
7. Gunakan `onClick` untuk aksi, `to` untuk navigasi, dan `type="submit"` untuk form.
8. Gunakan warna custom hanya jika kebutuhan desain memang berbeda dari standar.

## 15. Dependensi

Pastikan package berikut sudah terpasang:

```bash
npm install lucide-react react-router-dom
```

## 16. Ringkasan

`ButtonComponent.jsx` merupakan satu sumber komponen tombol yang dapat dipakai pada seluruh halaman aplikasi.

Contoh pemakaian singkat:

```jsx
<ButtonComponent
  variant="primary"
  icon={Plus}
  size="lg"
  onClick={handleAdd}
>
  Tambah Kamera
</ButtonComponent>
```

Dengan pendekatan ini, perubahan style tombol bisa dilakukan secara terpusat tanpa harus mengedit semua halaman yang menggunakannya.
