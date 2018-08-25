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
      email: (field, params) => {
        return "รูปแบบอีเมลล์ไม่ถูกต้อง.";
      },
      confirmed: (field, params) => {
        return "กรุณายืนยันรหัสผ่านให้ถูกต้อง.";
      }
    }
  },
}

Validator.localize(dictionary);
const validator = new Validator({
  first_name: 'alpha'
});
validator.localize('th');
