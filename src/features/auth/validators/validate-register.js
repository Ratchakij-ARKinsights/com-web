import Joi from 'joi';

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.empty': 'First name is required.'
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'Last name is required.'
  }),
  email: Joi.alternatives([
    Joi.string().email({ tlds: false }), // โดยค่า { tlds: false } จะกำหนดให้ไม่ต้องตรวจสอบ Top-Level Domain (TLD) หรือส่วนของโดเมนของอีเมล (เช่น .com, .org, .net เป็นต้น) ในขณะที่ค่าเริ่มต้นของ Joi คือใช้ตรวจสอบ TLD ด้วย
    Joi.string().pattern(/^[0-9]{10}$/)
  ]).messages({
    'alternatives.match': 'Invalid email address or mobile number.'
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.pattern.base':
        'Password must be at least 6 characters and contain only alphabet and number.'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
    'any.only': 'Password and confirm password did not match.',
    'string.empty': 'Confirm password is required.'
  })
});

const validateRegister = input => {
  /* { abortEarly: false } คือกำหนดว่าเมื่อพบข้อผิดพลาดแต่ละรายการ ไม่จำเป็นต้องหยุดการตรวจสอบทันที 
  แต่จะทำการตรวจสอบทุกข้อผิดพลาด และคืนผลลัพธ์ทั้งหมดกลับมาในตัวแปร error */
  const { error } = registerSchema.validate(input, { abortEarly: false });

  if (error) {
    return error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
  }
};

export default validateRegister;