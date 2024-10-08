import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { PromoCode } from '../../interfaces/promo-codes.interface';
import { Firestore } from '@angular/fire/firestore';
import { PromoCodeService } from '../../services/promo-code.service';
import { FormsModule, NgForm } from '@angular/forms';
import { doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-promo-code',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './promo-code.component.html',
  styleUrl: './promo-code.component.scss',
})
export class PromoCodeComponent implements OnInit {
  firestore = inject(Firestore);
  promoCodeService = inject(PromoCodeService);

  promoCode: string = '';
  activePromoCodes: PromoCode[] = [];
  showApplyMessage: boolean = false;

  @Output() promoCodeDiscount = new EventEmitter<number>();

  ngOnInit(): void {
    this.loadActivePromoCodes();
  }

  applyPromoCode(promoCode: string, form: NgForm): void {
    if (!promoCode) {
      this.showApplyMessage = false;
      return;
    }

    const promoCodeToApply = this.activePromoCodes.find(
      (activePromoCode) => activePromoCode.name === promoCode
    );

    if (promoCodeToApply) {
      this.promoCodeDiscount.emit(promoCodeToApply.discount);
      localStorage.setItem('promoCode', promoCodeToApply.name);
      this.showApplyMessage = true;

      const promoCodeRef = doc(
        this.firestore,
        `promocodes/${promoCodeToApply.name}`
      );
      updateDoc(promoCodeRef, {
        active: false,
      });

      this.loadActivePromoCodes();

      setTimeout(() => {
        this.showApplyMessage = false;
      }, 3000);

      form.resetForm();
    } else {
      this.showApplyMessage = false;
    }
  }

  loadActivePromoCodes(): void {
    this.promoCodeService.getPromoCodes().then((promoCodes) => {
      this.activePromoCodes = promoCodes.filter(
        (promoCode) => promoCode.active
      );
    });
  }
}
