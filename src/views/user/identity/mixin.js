import { mapState, mapMutations } from "vuex";
import { postIdentityInfo, checkIdCard, checkIdCard2 } from "@/api/identity";
// checkIdCard
// 身份认证 方法
const mixin = {
  mounted() {},
  computed: {
    ...mapState("identity", [
      "auth_status",
      "id_number",
      "name",
      "id_card_front",
      "id_card_back",
      "hold_id_card",
      "company",
      "license",
      "job",
      "planned",
      "current"
    ]),
    ...mapState(["token"])
  },
  methods: {
    // 保存表单的数值
    saveValue($evt) {
      let inputName = $evt.target.name;
      let val = $evt.target.value.trim();
      if (val) this[inputName](val);
    },
    // 上传图片
    async uploadImage(fnName) {
      let response = await this.$bridge.call("get_image", {
        count: 1,
        crop: 0,
        isCamera: 1
      });
      console.log(response);
      // 如果是身份证正面则，存储起来
      if (fnName === "setIdCardFront") {
        this.idCardFrontBase64 = response.base64s[0] || "";
      }
      // 存储到vuex
      if (Array.isArray(response.image) && response.image.length) {
        this[fnName](response.image[0]);
      }
    },
    async submit() {
      let params;
      switch (this.auth_status * 1) {
        case 1:
          // 技能认证 需验证身份证
          params = await this.checkFormAuth1();
          break;
        case 2:
          params = this.checkFormAuth2();
          break;
        case 3:
        case 4:
          params = this.checkFormAuth3();
          break;
      }
      if (!params) {
        return false;
      }
      try {
        this.$Indicator.open("加载中...");
        let res = await postIdentityInfo(params);
        if (res.error_code === 0) {
          this.$Toast({
            message: "提交成功",
            duration: 1500
          });
          // 提交成功后，返回首页
          setTimeout(() => {
            this.$bridge.call("router_app", {
              type: "app_mine"
            });
          }, 1800);
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
        this.$Indicator.close();
      } catch (err) {
        console.log(err);
        this.$Indicator.close();
      }
    },
    // 技能者
    async checkFormAuth1() {
      let idReg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
      if (!this.name) {
        this.$Toast({ message: "请输入姓名", duration: 1500 });
        return false;
      }
      if (!idReg.test(this.id_number)) {
        this.$Toast({ message: "请重新输入身份证号码", duration: 1500 });
        return false;
      }
      if (!this.id_card_front) {
        this.$Toast({ message: "请上传身份证人像面", duration: 1500 });
        return false;
      }
      if (!this.id_card_back) {
        this.$Toast({ message: "请上传身份证国徽面", duration: 1500 });
        return false;
      }
      if (!this.hold_id_card) {
        this.$Toast({ message: "请上传手持身份证照片", duration: 1500 });
        return false;
      }

      // 检查身份证照片 和 姓名是否一致
      if (!this.idCardFrontBase64) {
        return;
      }
      // ORC 识别身份证
      try {
        this.$Indicator.open("加载中...");
        let res1 = await checkIdCard(this.idCardFrontBase64);
        this.$Indicator.close();
        console.log(res1);
        // 识别失败
        if (res1.message.status === -1) {
          this.$Toast({
            message: "识别失败，请重新上传",
            duration: 1500
          });
          return;
        }
        // 识别成功 开始检验
        if (res1.message.status === 2) {
          let cardInfo = res1.cardsinfo[0].items || [];
          let nameData = cardInfo.find(item => {
            return item.desc === "姓名";
          });
          let idData = cardInfo.find(item => {
            return item.desc === "公民身份号码";
          });
          // console.log(nameData, idData);
          if (nameData.content !== this.name) {
            this.$Toast({
              message: "姓名不匹配",
              duration: 1500
            });
            return false;
          }
          if (idData.content !== this.id_number) {
            this.$Toast({
              message: "身份证号码不匹配",
              duration: 1500
            });
            return false;
          }
          // 身份证号码 认证
          try {
            this.$Indicator.open("加载中...");
            let res2 = await checkIdCard2(this.id_number, this.name);
            this.$Indicator.close();
            if (res2.resp.code === 0) {
              let params = {
                token: this.token,
                auth_status: this.auth_status,
                id_number: this.id_number,
                name: this.name,
                id_card_front: this.id_card_front,
                id_card_back: this.id_card_back,
                hold_id_card: this.hold_id_card
              };
              return params;
            } else {
              this.$Toast({
                message: res2.resp.desc || "身份证认证失败",
                duration: 1500
              });
            }
          } catch (err2) {
            console.log(err2);
            this.$Indicator.close();
          }
        }
      } catch (err) {
        console.log(err);
        this.$Indicator.close();
      }
    },
    // 雇主企业
    checkFormAuth2() {
      if (!this.company) {
        this.$Toast({ message: "请输入机构名称", duration: 1500 });
        return false;
      }
      if (!this.license) {
        this.$Toast({ message: "请上传营业执照", duration: 1500 });
        return false;
      }
      let params = {
        token: this.token,
        auth_status: this.auth_status,
        company: this.company,
        license: this.license
      };

      return params;
    },
    // 投资人
    checkFormAuth3() {
      if (!this.job) {
        this.$Toast({ message: "请输入您的职位", duration: 1500 });
        return false;
      }
      if (!this.planned) {
        this.$Toast({ message: "请输入您的投资目标", duration: 1500 });
        return false;
      }
      if (this.planned <= 0 || this.planned > 10000) {
        this.$Toast({ message: "请重新输入您的投资目标", duration: 1500 });
        return false;
      }
      if (!this.current) {
        this.$Toast({ message: "请输入已完成的投资金额", duration: 1500 });
        return false;
      }
      if (this.current <= 0 || this.current > 10000) {
        this.$Toast({
          message: "请重新输入已完成的投资金额",
          duration: 1500
        });
        return false;
      }
      let params = {
        token: this.token,
        auth_status: this.auth_status,
        job: this.job,
        planned: this.planned,
        current: this.current
      };
      return params;
    },
    ...mapMutations("identity", [
      "setAuthStatus",
      "setIdNumber",
      "setName",
      "setIdCardFront",
      "setIdCardBack",
      "setHoldIdCard",
      "setCompany",
      "setLicense",
      "setJob",
      "setPlanned",
      "setCurrent"
    ])
  },
  destroyed() {
    this.setIdNumber("");
    this.setName("");
    this.setIdCardFront("");
    this.setIdCardBack("");
    this.setHoldIdCard("");
    this.setCompany("");
    this.setLicense("");
    this.setJob("");
    this.setPlanned("");
    this.setCurrent("");
  }
};

export default mixin;
