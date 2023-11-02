import { Controller, Get } from '@nestjs/common';
import { PlaywrightService } from './playwright.service';

@Controller('form-submission')
export class PlaywrightController {
  constructor(private readonly playwrightService: PlaywrightService) {}

  @Get('submit')
  async submitForm() {
    const payload = {
      name: 'John Doe',
      email: 'john@doe.com',
      merek: 'MyProduct',
      nomor_registrasi: '121121',
      nama_pemilik: 'Jane Smith',
      hubungan_pelapor: 'Business Partner',
      nama_perusahaan: 'XYZ Corporation',
      pemilik_haki_: true,
      website_perusahaan: 'https://www.xyzcorp.com',
      alamat_perusahaan: '123 Main Street, City',
      alamat_email_pemilik_merek: 'jane@xyzcorp.com',
      no_telepon_pelapor: '5551234567',
      link_barang: 'https://www.xyzcorp.com/product123',
      body: 'The quick brown fox jumps over the lazy dog. A quaint, cozy cabin nestled among tall trees, offering respite from the bustling city life.',
    };
    const confirmationMessage =
      await this.playwrightService.submitForm(payload);
    return { message: 'Form submitted', confirmationMessage };
  }
}
