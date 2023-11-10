import { Injectable } from '@nestjs/common';
import { chromium, Browser, Page } from 'playwright';

@Injectable()
export class PlaywrightService {
  private browser: Browser;
  private page: Page;

  constructor() {
    this.setupBrowser();
  }

  async setupBrowser() {
    this.browser = await chromium.launch({
      headless: false,
    });
    this.page = await this.browser.newPage();
  }

  async submitForm(data: any) {
    const selectors = {
      name: '#name',
      email: '#email',
      merek: '[name="merek"]',
      nomor_registrasi: '[name="nomor_registrasi"]',
      nama_pemilik: '[name="nama_pemilik"]',
      hubungan_pelapor: '[name="hubungan_pelapor"]',
      nama_perusahaan: '[name="nama_perusahaan"]',
      website_perusahaan: '[name="website_perusahaan"]',
      alamat_perusahaan: '[name="alamat_perusahaan"]',
      alamat_email_pemilik_merek: '[name="alamat_email_pemilik_merek"]',
      no_telepon_pelapor: '[name="no_telepon_pelapor"]',
      link_barang: '[name="link_barang"]',
      bukti_surat_kuasa: '[name="bukti_surat_kuasa"]',
      bukti_surat_izin_usaha: '[name="bukti_surat_izin_usaha"]',
      body: '[name="body"]',
    };

    try {
      await this.page.goto('https://bukabantuan.bukalapak.com/form/175');

      await this.page.fill(selectors.name, data.name);

      await this.page.fill(selectors.email, data.email);

      await this.page.fill(selectors.merek, data.merek);

      await this.page.fill(selectors.nomor_registrasi, data.nomor_registrasi);
      await this.page.fill(selectors.nama_pemilik, data.nama_pemilik);
      await this.page.fill(selectors.hubungan_pelapor, data.hubungan_pelapor);
      await this.page.fill(selectors.nama_perusahaan, data.nama_perusahaan);

      const radioXPath = `//input[@type='radio' and @value='Iya (Yes)']`;

      await this.page.click(radioXPath);

      await this.page.fill(
        selectors.website_perusahaan,
        data.website_perusahaan,
      );
      await this.page.fill(selectors.alamat_perusahaan, data.alamat_perusahaan);
      await this.page.fill(
        selectors.alamat_email_pemilik_merek,
        data.alamat_email_pemilik_merek,
      );
      await this.page.fill(
        selectors.no_telepon_pelapor,
        data.no_telepon_pelapor,
      );
      await this.page.fill(selectors.link_barang, data.link_barang);

      await this.page.fill(selectors.body, data.body);

      const uploadFileOne = await this.page.$(
        'input[name="link_barang_banyak"]',
      );
      await uploadFileOne.setInputFiles('src/files/empty_file_1.xlsx');

      const uploadFileTwo = await this.page.$(
        'input[name="surat_kepemilikan_merek"]',
      );
      await uploadFileTwo.setInputFiles('src/files/empty_file_2.docx');

      const uploadPDFFileOne = await this.page.$(
        'input[name="bukti_surat_kuasa"]',
      );
      await uploadPDFFileOne.setInputFiles('src/files/empty_file_3.pdf');
      const uploadPDFFileTwo = await this.page.$(
        'input[name="bukti_surat_izin_usaha"]',
      );
      await uploadPDFFileTwo.setInputFiles('src/files/empty_file_3.pdf');
      await this.page.click('input[type="checkbox"]');
      await this.page.click('[type="Submit"]');

      const responseSelector = '.u-lede';
      await this.page.waitForSelector(responseSelector);

      const responseText = await this.page.textContent(responseSelector);

      return {
        message: responseText,
      };
    } catch (error) {
      console.error('Form submission failed:', error);
      return 'Form submission failed';
    }
  }

  async closeBrowser() {
    await this.browser.close();
  }
}
