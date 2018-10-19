import {
  Validator
} from 'vee-validate';

const dictionary = {
  th: {
    messages: {
      required: (field, params) => {
        return "ฟิลด์ต้องไม่ว่างปล่าว.";
      },
      min: (field, params) => {
        return "ฟิลด์จำเป็นต้องมีตัวอักษรมากกว่า " + params + " ตัวอักษร.";
      },
      max: (field, params) => {
        return "ฟิลด์จำเป็นต้องมีตัวอักษรน้อยกว่า " + params + " ตัวอักษร.";
      },
      email: (field, params) => {
        return "รูปแบบอีเมลล์ไม่ถูกต้อง.";
      },
      confirmed: (field, params) => {
        return "กรุณายืนยันรหัสผ่านให้ถูกต้อง.";
      },
      numeric: (field, params) => {
        return "ต้องเป็นตัวเลขเท่านั้น";
      },
      regex: (field, params) => {
        return "รูปแบบไม่ถูกต้อง";
      },
      card: () => {
        return "รูปแบบเลขบัตรไม่ถูกต้อง";
      }
    }
  },
}

Validator.extend('card', {
  getMessage: field => 'รูปแบบเลขบัตรไม่ถูกต้อง',
  validate: (value, args) => {
    // remove space from card_number
    let card_number = value.replace(/ /g, "");
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(card_number) || /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(
        card_number
      ) || /^(?:2131|1800|35\d{3})\d{11}$/.test(card_number)) {
      return true;
    } else {
      return false;
    }
  }
})

Validator.localize(dictionary);
const validator = new Validator({
  first_name: 'alpha'
});
validator.localize('th');
