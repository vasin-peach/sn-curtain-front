<template>
  <div class="policy-service policy-layout">
    <div class="container">
      <p>1. ความเป็นส่วนตัว</p>
      <div class="content">
        1.1 เราให้ความสำคัญกับความเป็นส่วนอย่างถึงที่สุด เพื่อคุ้มครองสิทธิของลูกค้าทุกท่าน
        เราจึงได้มีการจัดทำ<router-link
          :to="{ name: 'PolicyPrivacy'}"
          class="color-orange1"
        >นโยบายความเป็นส่วนตัว</router-link>ขึ้น เพื่ออธิบายแนวทางปฎิบัติด่านความเป็นส่วนตัวในรายละเอียด โปรดอ่านนโยบายความเป็นส่วนตัวนี้อย่างละเอียดเพื่อประโยชน์แก่ตัวท่านเอง, ทาง S&N CURTAIN ได้มีการเก็บรวบรวมและใช้ข้อมูลเกี่ยวกับบัญชีของคุณดังงี้:
        <div class="subcontent">
          <div>[1] ยินยอมให้ S&N CURTAIN เก็บรวบรวม ใช้งาน เปิดเผย และดำเนินการเกี่ยวกับเนื้อหา ข้อมูลส่วนบุคคลและข้อมูลผู้ใช้ตามที่อธิบายไว้ใน<router-link
              :to="{ name: 'PolicyPrivacy'}"
              class="color-orange1"
            >นโยบายความเป็นส่วนตัว</router-link>
          </div>
          <div>[2] ตกลงและยินยอมว่าสิทธิการเป็นเจ้าของในข้อมูลของผู้ใช้นั้นเป็นของ S&N CURTAIN และของคุณร่วมกัน</div>
          <div>[3] ทางเราจะไม่เปิดเผยข้อมูลของผู้ใช้ต่อบุคคลภายนอก ไม่ว่าข้อมูลทั้งหมดหรือส่วนใหญ่ หรือยินยอมให้บุคคลภายนอกสามารถเข้าถึงหรือใช้ข้อมูลของผู้ใช้ของท่านโดยไม่ได้รับความยินยอมจากเราก่อน</div>
        </div>
      </div>
      <p>2. ซอฟต์แวร์</p>
      <div class="content">
        2.1 ซอฟต์แวร์ที่เราจัดไว้ให้คุณเป็นส่วนหนึ่งของบริการนี้ อยู่ภายใต้ข้อกำหนดของเงื่อนไขการให้บริการนี้ S&N CURTAIN สงวนสิทธิ์ทั้งหมดต่อซอฟต์แวร์ที่ไม่ได้อนุญาตไว้อย่างชัดแจ้งโดย S&N CURTAIN ในที่นี้ สคริปต์หรือรหัสของบุคคลภายนอก ที่เชื่อมโยงไปยังหรืออ้างถึงจากบริการ บุคคลภายนอกที่เป็นเจ้าของสคริปต์หรือรหัสดังกล่าวเป็นผู้มอบสิทธิ์การใช้งานให้แก่คุณ ไม่ใช่มอบให้โดย S&N CURTAIN
      </div>
      <p>3. บัญชีและความปลอดภัย</p>
      <div class="content">
        3.1 การทำงานบางอย่างของบริการของเราต้องมีการลงทะเบียนบัญชีโดยเลือกรหัสประจำตัวผู้ใช้ที่ไม่ซ้ำกัน ("ID ผู้ใช้") และรหัสผ่าน และโดยการให้ข้อมูลส่วนบุคคลบางอย่าง หากคุณเลือก ID ผู้ใช้ ที่ตามดุลยพินิจแต่เพียงผู้เดียวของ S&N CURTAIN เห็นว่า สร้างความขุ่นเคืองหรือไม่เหมาะสม S&N CURTAIN มีสิทธิที่จะระงับหรือยกเลิกบัญชีของคุณได้ คุณอาจสามารถใช้บัญชีเพื่อเข้าถึงผลิตภัณฑ์ เว็บไซต์ หรือบริการอื่นๆ ซึ่งเราอนุญาตให้เข้าถึงได้ หรือที่เชื่อมโยงกันหรือทำงานร่วมกัน S&N CURTAIN ไม่ได้ตรวจสอบ และไม่รับผิดชอบต่อเนื้อหาของบุคคลภายนอก ฟังก์ชั่นการทำงาน ความปลอดภัย บริการ นโยบายความเป็นส่วนตัว หรือการปฏิบัติอื่นๆ ของผลิตภัณฑ์ เว็บไซต์ หรือบริการเหล่านั้น หากคุณกระทำการดังกล่าว เงื่อนไขการให้บริการของผลิตภัณฑ์ เว็บไซต์ หรือบริการเหล่านั้น รวมถึงนโยบายความเป็นส่วนตัวที่เกี่ยวข้อง หากแตกต่างจากเงื่อนไขการให้บริการและ/หรือนโยบายความเป็นส่วนตัวของเรา อาจบังคับใช้กับการใช้ผลิตภัณฑ์ เว็บไซต์ หรือบริการเหล่านั้นของคุณ
        3.2 คุณตกลงในเงื่อนไขต่อไปนี้
        <div class="subcontent">
          <div>[1] เก็บรักษารหัสผ่านไว้เป็นความลับและใช้เฉพาะ ID ผู้ใช้และรหัสผ่านของคุณเมื่อเข้าสู่ระบบ</div>
          <div>[2] ตรวจสอบให้แน่ใจว่าคุณออกจากระบบบัญชีเมื่อสิ้นสุดแต่ละเซสชันบนไซต์</div>
          <div>[3] แจ้ง S&N CURTAIN ทันทีหากมีการใช้บัญชี ID ผู้ใช้ และ/หรือรหัสผ่านของคุณโดยไม่ได้รับอนุญาต</div>
          <div>[4] ตรวจสอบให้แน่ใจว่าข้อมูลบัญชีของคุณถูกต้องและเป็นปัจจุบันอยู่เสมอ คุณต้องรับผิดชอบอย่างเต็มที่ต่อกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้ ID ผู้ใช้และบัญชีของคุณ แม้ว่าคุณจะไม่ได้ทำกิจกรรมหรือทำการใช้งานดังกล่าวก็ตาม S&N CURTAIN จะไม่รับผิดต่อความสูญเสียหรือความเสียหายที่เกิดจากการใช้รหัสผ่านของคุณโดยไม่ได้อนุญาต หรือการที่คุณไม่สามารถปฏิบัติตามความในส่วนนี้</div>
        </div>
        3.3 คุณตกลงว่า S&N CURTAIN อาจ ไม่ว่าด้วยเหตุผลใดและตามดุลยพินิจแต่เพียงผู้เดียวของตน และโดยไม่ต้องแจ้งหรือรับผิดต่อคุณหรือบุคคลภายนอกใดๆ ยกเลิกบัญชีและ ID ผู้ใช้ของคุณทันที และลบหรือเพิกถอนเนื้อหาใดก็ตามที่เกี่ยวข้องกับบัญชีหรือ ID ผู้ใช้ของคุณออกจากไซต์ มูลเหตุสำหรับการยกเลิกดังกล่าวอาจได้แก่ แต่ไม่จำกัดเพียง (ก) การไม่มีการใช้งานเป็นเวลานานๆ (ข) การละเมิดเจตนารมณ์หรือตัวอักษรของเงื่อนไขการให้บริการนี้ (ค) พฤติกรรมผิดกฎหมาย ฉ้อฉล ล่วงละเมิด ทำให้เสื่อมเสีย คุกคาม หรือขู่เข็ญ (ง) การมีบัญชีผู้ใช้หลายบัญชีเพื่อเหตุอันมิชอบด้วยกฎหมาย หรือ (จ) พฤติกรรมที่เป็นอันตรายต่อผู้ใช้คนอื่น บุคคลภายนอก หรือผลประโยชน์ทางธุรกิจของ S&N CURTAIN การใช้บัญชีเพื่อจุดประสงค์ที่ผิดกฎหมาย ฉ้อฉล ล่วงละเมิด ทำให้เสื่อมเสีย คุกคาม หรือขู่เข็ญ อาจมีการแจ้งให้หน่วยงานบังคับใช้กฎหมายทราบโดยไม่ต้องแจ้งแก่คุณ หากเกิดข้อพิพาททางกฎหมายหรือการดำเนินคดีเกี่ยวกับบัญชีหรือการใช้บริการของคุณ ไม่ว่าด้วยเหตุผลใดก็ตาม S&N CURTAIN อาจยกเลิกบัญชีของคุณทันทีโดยไม่แจ้งให้ทราบ
      </div>
      <p>4. การจัดส่ง</p>
      <div class="content">
        4.1 ทาง S&N CURTAINรับประกันว่าผู้ซื้อจะได้รับการคุ้มครองความปลอดภัยของสินค้าที่ซื้ออย่างถึงที่สุด ในกรณีที่สินค้าเสียหาย สูญหาย หรือไม่สามารถจัดส่งได้ในระหว่างการจัดส่ง ให้ผู้ใช้ทราบและตกลงว่า S&N จะไม่รับผิดชอบความเสียหาย ค่าใช้จ่ายใดๆทั้งสิ้น หรือ พิจารณาเป็นรายไป
        4.2 ทาง S&N CURTAINไม่รับรองการจัดส่งนอกประเทศ
      </div>
      <p>5. การยกเลิก การคืนสินค้า และการคืนเงิน</p>
      <div class="content">
        5.1 เมื่อทำการชำระเงินผ่านการการตัดบัตร หรือชำระผ่านการโอนและทำการยืนยันรายการแล้ว ผู้ซื้อไม่สามารถทำการยื่นคำร้องขอคืนสินค้าโดยทางร้านขอสงวนสิทธิในการคืนเงินทุกกรณี หรือเงินได้โปรดดูรายละเอียดใน <router-link
          :to="{ name: 'PolicyRefunds'}"
          class="color-orange1"
        >นโยบายการคืนสินค้าและการคืนเงิน</router-link>
      </div>
      <p>6. การรับรองและรับประกันของคุณ</p>
      <div class="content">
        คุณรับรองและรับประกันว่า
        <div class="subcontent">
          <div>(ก) คุณบรรลุนิติภาวะ (และในกรณีของผู้เยาว์ ได้รับความยินยอมจากพ่อแม่หรือผู้ปกครองตามกฎหมาย) มีสิทธิและความสามารถที่จะเข้าทำสัญญาเงื่อนไขการให้บริการนี้และปฏิบัติตามเงื่อนไขนี้ และ</div>
          <div>(ข) คุณจะใช้บริการเพื่อจุดประสงค์ที่ถูกกฎหมายและตามเงื่อนไขการให้บริการนี้ และกฎหมาย กฎระเบียบ ประมวลกฎหมาย คำสั่ง แนวทางปฏิบัติ นโยบายและข้อบังคับที่บังคับใช้ทั้งหมด</div>
        </div>
      </div>
      <p>7. การแยกออกจากกันได้</p>
      <div class="content">
        หากบทบัญญัติใดในเงื่อนไขการให้บริการนี้ถือว่าผิดกฎหมาย เป็นโมฆะ หรือไม่สามารถบังคับใช้ได้ไม่ว่าด้วยเหตุผลใดภายใต้กฎหมายของเขตอำนาจศาลใด ให้ถือว่าบทบัญญัตินั้นสามารถแยกออกจากกันได้จากข้อกำหนดและเงื่อนไขนี้ และไม่ส่งผลต่อความสมบูรณ์และการมีผลบังคับใช้ของบทบัญญัติที่เหลือ หรือความสมบูรณ์และการมีผลบังคับใช้ของบทบัญญัติที่มีปัญหาภายใต้กฎหมายของเขตอำนาจศาลอื่นใด
      </div>
      <p>8. กฎหมายที่ใช้บังคับ</p>
      <div class="content">
        เงื่อนไขการให้บริการนี้จะอยู่ภายใต้บังคับและตีความตามกฎหมายของประเทศไทย โดยไม่คำนึงถึงความขัดแย้งกับกฎแห่งกฎหมาย อนุสัญญาสหประชาชาติว่าด้วยสัญญาการจำหน่ายสินค้าระหว่างประเทศและกฎหมายธุรกรรมข้อมูลคอมพิวเตอร์ที่เป็นมาตรฐานเดียวกัน ถึงขอบเขตที่บังคับใช้ได้ ถูกสงวนสิทธิ์ไว้อย่างชัดแจ้ง เว้นแต่กฎหมายที่บังคับใช้จะกำหนดไว้เป็นอย่างอื่น ข้อพิพาท ข้อขัดแย้ง การเรียกร้องสิทธิหรือความแตกต่างทุกประเภทที่อาจจะเกิดขึ้น จากหรือเกี่ยวข้องกับเงื่อนไขการให้บริการนี้ ต่อหรือเกี่ยวข้องกับ S&N CURTAIN หรือฝ่ายที่ได้รับการชดใช้ภายใต้เงื่อนไขการให้บริการนี้ ให้ส่งเรื่องและยุติในขั้นตอนสุดท้ายโดยอนุญาโตตุลาการประเทศไทยตามกฎการอนุญาโตตุลาการของสถาบันอนุญาโตตุลาการ (“กฎ THAC”) ที่บังคับใช้อยู่ในขณะนี้ ซึ่งถือว่าได้รวมกฎเข้าไว้โดยการอ้างอิงในส่วนนี้ จะมีอนุญาโตตุลาการหนึ่ง (1) ท่านและภาษาในการอนุญาโตตุลาการคือภาษาไทย
      </div>
      <p>9 บทบัญญัติทั่วไป</p>
      <div class="content">
        9.1 S&N CURTAIN สงวนสิทธิ์ทั้งหมดที่ไม่ได้ให้ไว้โดยชัดแจ้งในที่นี้
        9.2 S&N CURTAIN อาจแก้ไขเงื่อนไขการให้บริการนี้ได้ตลอดเวลาโดยโพสต์เงื่อนไขการให้บริการฉบับแก้ไขบนไซต์นี้ การใช้งานไซต์นี้ต่อไปของคุณหลังการเปลี่ยนแปลงดังกล่าวจะถือว่าคุณยอมรับเงื่อนไขการให้บริการฉบับแก้ไขนั้นแล้ว
        9.3 คุณต้องไม่มอบหมาย ให้สิทธิ์การใช้งานต่อ หรือโอนสิทธิที่มอบให้แก่คุณในที่นี้หรือทำสัญญาช่วงข้อผูกพันใดๆ ของคุณ
        9.4 ไม่มีสิ่งใดในเงื่อนไขการให้บริการนี้จะถือเป็นการเป็นหุ้นส่วน การลงทุนร่วม หรือความสัมพันธ์ระหว่างตัวการกับตัวแทน ระหว่างคุณและ S&N CURTAIN และไม่มีสิ่งใดอนุญาตให้คุณสร้างภาระค่าใช้จ่ายหรือหนี้สินในนามของ S&N CURTAIN
        9.5 เงื่อนไขที่กำหนดไว้ในเงื่อนไขการให้บริการนี้และข้อตกลงรวมถึงนโยบายใดๆ ที่รวมอยู่ในหรืออ้างถึงในเงื่อนไขการให้บริการนี้ ถือเป็นข้อตกลงที่สมบูรณ์ และความเข้าใจของคู่สัญญาอันเกี่ยวกับบริการและไซต์ และใช้แทนที่ข้อตกลงหรือความเข้าใจก่อนหน้านี้ระหว่างคู่สัญญาซึ่งเกี่ยวข้องกับเรื่องดังกล่าว ดังนั้นคู่สัญญาจึงยกเว้นเงื่อนไขโดยนัยทั้งหมดตามข้อเท็จจริง ในการเข้าทำข้อตกลงที่เกิดจากเงื่อนไขการให้บริการนี้นั้น คู่สัญญาไม่ได้พึ่งพาถ้อยแถลง การรับรอง การรับประกัน ความเข้าใจ ภาระหน้าที่ คำสัญญา หรือคำมั่นจากบุคคลใดนอกเหนือจากที่ระบุไว้อย่างชัดแจ้งในเงื่อนไขการให้บริการนี้ คู่สัญญาแต่ละฝ่ายสละการเรียกร้องที่เพิกถอนไม่ได้และไม่มีเงื่อนไข สิทธิและการเยียวยาทั้งหมด ซึ่งแต่สำหรับส่วนนี้ ตนอาจมีอันเกี่ยวเนื่องกับสิ่งใดที่กล่าวมาก่อนหน้านี้ เงื่อนไขการให้บริการนี้ไม่อาจโต้แย้ง อธิบาย หรือเสริมด้วยหลักฐานข้อตกลงก่อนหน้า ข้อตกลงปากเปล่าซึ่งเกิดขึ้นพร้อมกัน หรือเงื่อนไขเพิ่มเติมที่สอดคล้องกันใดๆ
        9.7 คุณตกลงที่จะปฏิบัติตามกฎหมาย บทกฎหมาย ข้อบังคับและประมวลกฎหมายที่บังคับใช้ทั้งหมด ที่เกี่ยวกับการต่อต้านการติดสินบนและการทุจริต รวมถึงแต่ไม่จำกัดเพียงพระราชบัญญัติการติดสินบนของสหราชอาณาจักร กฎหมายป้องกันการทุจริตในต่างประเทศของสหรัฐฯ และกฎหมายป้องกันการทุจริตของสิงคโปร์ รวมทั้งยืนยันว่าคุณได้และจะกำหนดนโยบายและระเบียบทั้งหมดที่จำเป็นเพื่อรับรองการปฏิบัติตามข้อกำหนดดังที่ว่านี้
        9.8 หากมีคำถามหรือข้อกังวลเกี่ยวกับเงื่อนไขการให้บริการนี้ หรือมีปัญหาที่เกิดจากเงื่อนไขการให้บริการนี้หรือบนไซต์ โปรดติดต่อเราที่: support@sncurtain.com
      </div>

      <div class="subcontent">
        <div>
          ข้าพเจ้าได้อ่านข้อตกลงนี้และตกลงยอมรับบทบัญญัติทั้งหมดข้างต้นและการแก้ไขบทบัญญัติใดๆ ที่จะเกิดตามมาในภายหลัง ในการคลิกปุ่ม “สมัครใช้งาน” หรือ “เชื่อมต่อด้วย FACEBOOK” ด้านล่าง ข้าพเจ้าเข้าใจว่าข้าพเจ้ากำลังสร้างลายเซ็นดิจิตอล ซึ่งข้าพเจ้าประสงค์ให้มีผลบังคับใช้เสมือนกับว่าข้าพเจ้าได้ลงชื่อด้วยตัวเอง
        </div>
      </div>
      <div class="subcontent color-orange1">
        ปรับปรุงครั้งล่าสุดเมื่อวันที่ 21 ธันวาคม 2561
      </div>
      <hr>
      <router-link
        :to="{ name: 'Policy'}"
        class="color-orange1"
      >ย้อนกลับ</router-link>

    </div>

  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
