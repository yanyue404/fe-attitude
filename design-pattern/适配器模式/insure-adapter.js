/**
 * 通用参数信息
 * @param {Object} context
 * @param {Object} context.state
 * @param {Object} context.getters
 * @param {Object} context.rootState
 * @param {Object} params 请求报文
 * @param {Object} res 响应报文
 * @param {Object} templateConfig 模板配置信息（beforeCalculate 有）
 * @return {Object}
 *
 */

 import { subtract } from "lodash";

 // 测算前修改
 export const beforeCalculate = (
   { getters, state, rootState },
   params,
   templateConfig
 ) => {
   // 服务端
   if (process.server) {
     return params;
   }
   // 客户端
   // 改变定额方案及保障责任
   let planIndex = rootState["@template-repurchase"].configData.planIndex;
   let plan = templateConfig.planLiabilityListData[planIndex];
   let planId = plan[`planId${state.calpayType}`];
   let calculateList = [];
   const planLiabilityList = params.calculateData.planLiabilityList;
   let firstAdditionalLib = planLiabilityList.find(
     (v) => v.liabilityName === "个人特定恶性肿瘤疾病保险金"
   );
   if (firstAdditionalLib) {
     plan = firstAdditionalLib;
     planId = plan[`planId${state.calpayType}`];
   }
 
   // ! 动态拼测算的产品 code与折扣情况
   // * 默认原价的情况
   calculateList = [
     {
       calpayType: "Y",
       planId: plan["planIdY"],
       monthflag: "1",
     },
     {
       calpayType: "M",
       planId: plan["planIdM"],
       monthflag: "1",
     },
   ];
   // * 8 折的情况
   if (planIndex === 1) {
     calculateList = [
       {
         calpayType: "Y",
         planId: plan["planIdY"],
         monthflag: "1",
       },
       {
         calpayType: "M",
         planId: plan["planIdM"],
         monthflag: "1",
       },
       {
         calpayType: "Y",
         planId: plan["planIdY"],
         monthflag: "1",
         discount: "0.8",
       },
       {
         calpayType: "M",
         planId: plan["planIdM"],
         monthflag: "1",
         discount: "0.8",
       },
     ];
   }
   params.calculateData.calculateList = calculateList;
   params.calculateData.planId = planId;
   params.insuredData = [
     {
       ...getters.insuredInfo,
       insuredRelationship: state.insureType,
       insuredSmokingHistory: "1",
       personalSerial: `I_0`,
       discount: planIndex === 0 ? "1" : "0.8", // 是否折扣
       socialSecurity: state.insuredSocial,
       //保障责任
       planLiabilityList: planLiabilityList,
     },
   ];
   return params;
 };
 
 // 测算后保存测算结果
 export const afterCalculate = ({ state, rootState }, res) => {
   let curRet;
   let planIndex = rootState["@template-repurchase"].configData.planIndex;
   if (planIndex === 0) {
     curRet = res[state.calpayType == "Y" ? "totalMonth" : "firstMonth"];
   } else {
     curRet = res[state.calpayType == "Y" ? "totalMonthDis" : "firstMonthDis"];
   }
   if (!curRet) {
     console.warn("这次测算接口不该调用");
     return;
   }
   const calculatorResult = {
     sumPremium: curRet.sumPremium,
     sumPolicyPremium: curRet.sumPolicyPremium,
     sumAmount: curRet.sumAmount,
     sumPremiumOrigin:
       res[state.calpayType == "Y" ? "totalMonth" : "firstMonth"].sumPremium, // footer 展示的原价
     sumPremiumMax:
       planIndex === 0
         ? res.firstMonth.sumPolicyPremium
         : res.firstMonthDis.sumPolicyPremium,
     sumPremiumMin:
       planIndex === 0
         ? res.totalMonth.sumPolicyPremium
         : res.totalMonthDis.sumPolicyPremium,
   };
   calculatorResult.sumDiscount = parseFloat(
     subtract(calculatorResult.sumPremiumMax, calculatorResult.sumPremiumMin)
   ).toFixed(2);
   // 测算后返回的的被保人信息
   // 临时存储测算返回被保人信息
   calculatorResult.calculatorPremium = curRet.insuredData;
   return calculatorResult;
 };
 
 // 核保前报文修改
 export const beforeDispatcher = ({ state, rootState }, params) => {
   const calculatorResult =
     rootState["@template-repurchase"].configData.calculatorResult;
   params.calculateData.sumPolicyPremium = calculatorResult.sumPolicyPremium;
   // 新增自定义混入测算报文的参数\
   const calculatorPremium = calculatorResult.calculatorPremium;
   params.insuredData = [
     {
       ...params.insuredData[0],
       //腾讯云需要传入每个人保费以及保额
       ...{
         totalPremium: calculatorPremium[0].totalPremium,
         totalAmount: calculatorPremium[0].totalAmount,
         policyPremium:
           state.calpayType == "Y"
             ? calculatorPremium[0].totalPremium
             : calculatorPremium[0].policyPremium,
         planLiabilityList: calculatorPremium[0].planLiabilityList,
       },
     },
   ];
   return params;
 };
 
 export default {
   beforeCalculate,
   afterCalculate,
   beforeDispatcher,
 };
 