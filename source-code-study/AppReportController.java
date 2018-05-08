package com.richfit.bjsop.controller.cus;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.github.pagehelper.PageInfo;
import com.richfit.bjsop.dao.comm.DBOperate;
import com.richfit.bjsop.util.CommPropertyAddUtil;
import com.richfit.bjsop.util.MySessionContext;

@Controller
@RequestMapping("/app/report")
public class AppReportController {
	
	@Autowired
	private DBOperate dbOperate;
	
	/**
	 * 客存报表
	 */
	@RequestMapping("/appKecunReportList")
	@ResponseBody
	public String appKecunReportList(HttpServletRequest request,HttpServletResponse response,String sid,@RequestParam Map params) throws Exception{
		String jsonString ="";
		Map retMap = new HashMap();
		
		String cusId ="";
		if(sid!=null){
			MySessionContext myc= MySessionContext.getInstance();  
			HttpSession session = myc.getSession(sid);  
			/** 获取session中的客户信息 */  
	        cusId = (String)session.getAttribute("cusId"); 
	        params.put("cusId", cusId);
	        
	        String nameSpace = "com.richfit.bjsop.entity.BasOilinfo.kecunCusReportList";
			CommPropertyAddUtil.addQueryPar(params, null);
			
			List<Map> entityList=dbOperate.select(nameSpace, params);
			
			if(entityList.size()>0){
				
				PageInfo pageInfo = new PageInfo(entityList);
			    int num=(int)pageInfo.getTotal();
				
				retMap.put("rows", entityList);
				
				jsonString = JSONArray.toJSONString(retMap,SerializerFeature.WriteDateUseDateFormat);
			}
		}else{
			jsonString="sid not give me";
		}
		return jsonString;
	}
	
	
	@RequestMapping("/kecunReportList")
	@ResponseBody
	public String kecunReportList(HttpServletRequest request,HttpServletResponse response,String sid,@RequestParam Map params) throws Exception{
		String jsonString ="";
		Map retMap = new HashMap();
		
		String cusId ="";
		HttpSession session = null;
		if(sid!=null){
			MySessionContext myc= MySessionContext.getInstance();  
			session = myc.getSession(sid);  
		}
        params.put("cusId", session.getAttribute("cusId"));
        if(session.getAttribute("cusType").equals("控股公司") && !session.getAttribute("cusCompany").equals("上海中油临港石油有限公司")){
        	 params.put("gyfgs", "0001");
        }else{
        	 params.put("gyfgs", session.getAttribute("setOrgId"));
        }
        //订单
		String nameSpace1 = "com.richfit.bjsop.entity.BasOilinfo.kecunReportOrderNum";
		CommPropertyAddUtil.addQueryPar(params, null);
		List<Map> kecunReportOrderNum=dbOperate.select(nameSpace1, params);
		
		//结算单
		String nameSpace2 = "com.richfit.bjsop.entity.BasOilinfo.kecunReportStatementNum";
		CommPropertyAddUtil.addQueryPar(params, null);
		List<Map> kecunReportStatementNum=dbOperate.select(nameSpace2, params);
		
		//付油单
		String nameSpace3 = "com.richfit.bjsop.entity.BasOilinfo.kecunReportNoticeNum";
		CommPropertyAddUtil.addQueryPar(params, null);
		List<Map> kecunReportNoticeNum=dbOperate.select(nameSpace3, params);
		
		//出库量
		List<Map> kecunReportOutNum=new ArrayList();
		if(session.getAttribute("cusType").equals("控股公司") && !session.getAttribute("cusCompany").equals("上海中油临港石油有限公司")){
			String nameSpace41 = "com.richfit.bjsop.entity.BasOilinfo.kecunReportOutGuanlianNum";
			CommPropertyAddUtil.addQueryPar(params, null);
			params.put("orgId", session.getAttribute("setOrgId"));
			kecunReportOutNum=dbOperate.select(nameSpace41, params);
		}else{
			String nameSpace42 = "com.richfit.bjsop.entity.BasOilinfo.kecunReportOutNum";
			CommPropertyAddUtil.addQueryPar(params, null);
			kecunReportOutNum=dbOperate.select(nameSpace42, params);
		}
		
		//查询水路出库量
		List<Map> kecunReportShuiluOutNum=new ArrayList();
		if(session.getAttribute("cusCompany") != null && session.getAttribute("cusCompany").equals("上海中油同盛石油有限公司")){
			String shuluSpace = "com.richfit.bjsop.entity.BasOilinfo.kecunReportShuiluOutNum";
			kecunReportShuiluOutNum=dbOperate.select(shuluSpace, params);
		}
		
		if(kecunReportOutNum.size()>0){
			for(int x=0;x<kecunReportOutNum.size();x++){
				Map map1=kecunReportOutNum.get(x);
				if(map1.get("OILINFO_ID").equals("EAB84D17703548CCA57510DB48A7103D")){//0号 普通柴油
					if(map1.get("outnum")!=null){
						Double outnum=Double.parseDouble(map1.get("outnum").toString());
						
						if(kecunReportShuiluOutNum.size()>0){
							Map map2=kecunReportShuiluOutNum.get(0);
							if(map2.get("shuilu")!=null){
								Double onum=Double.parseDouble(map2.get("shuilu").toString());
								map1.put("outnum",outnum+onum);
							}
						}
						
					}
					
				}
			}
		}
		
		//已开未提量
		List<Map> kecunReportGuanlianYikaiweitiNum=new ArrayList();
		List<Map> kecunReportYikaiweitiNum=new ArrayList();
		if(session.getAttribute("cusType").equals("控股公司") && !session.getAttribute("cusCompany").equals("上海中油临港石油有限公司")){
			String nameSpace51 = "com.richfit.bjsop.entity.BasOilinfo.kecunReportGuanlianYikaiweitiNum";
			CommPropertyAddUtil.addQueryPar(params, null);
			kecunReportGuanlianYikaiweitiNum=dbOperate.select(nameSpace51, params);
		}else{
			String nameSpace52 = "com.richfit.bjsop.entity.BasOilinfo.kecunReportYikaiweitiNum";
			CommPropertyAddUtil.addQueryPar(params, null);
			kecunReportYikaiweitiNum=dbOperate.select(nameSpace52, params);
		}
		
		List entityList=new ArrayList();
		if(kecunReportOrderNum.size()>0){
			
			for(int x=0;x<kecunReportOrderNum.size();x++){
				Map map=new HashMap();
				Map map1=kecunReportOrderNum.get(x);
				String OILINFO_ID=map1.get("OILINFO_ID").toString();
				//订单量
				map.put("OILINFO_ID", OILINFO_ID);
				map.put("OILINFO_NAME", map1.get("OILINFO_NAME"));
				map.put("CUS_COMPANY", session.getAttribute("cusCompany"));
				map.put("ordernum", map1.get("ordernum"));
				//结算量
				if(kecunReportStatementNum.size()>0){
					for(int y=0;y<kecunReportStatementNum.size();y++){
						Map map2=kecunReportStatementNum.get(y);
						String oilinfo_id=map2.get("OILINFO_ID").toString();
						if(oilinfo_id.equals(OILINFO_ID)){
							map.put("statementnum", map2.get("statementnum"));
						}
					}
				}else{
					map.put("statementnum", 0);
				}
				//付油量
				if(kecunReportNoticeNum.size()>0){
					for(int y=0;y<kecunReportNoticeNum.size();y++){
						Map map2=kecunReportNoticeNum.get(y);
						String oilinfo_id=map2.get("OILINFO_ID").toString();
						if(oilinfo_id.equals(OILINFO_ID)){
							map.put("noticenum", map2.get("noticenum"));
						}
					}
				}else{
					map.put("noticenum", 0);
				}
				//出库量
				if(kecunReportOutNum.size()>0){
					for(int y=0;y<kecunReportOutNum.size();y++){
						Map map2=kecunReportOutNum.get(y);
						String oilinfo_id=map2.get("OILINFO_ID").toString();
						if(oilinfo_id.equals(OILINFO_ID)){
							map.put("outnum", map2.get("outnum"));
						}
					}
				}else{
					map.put("outnum", 0);
				}
				//已开未提量
				if(kecunReportYikaiweitiNum.size()>0){
					for(int y=0;y<kecunReportYikaiweitiNum.size();y++){
						Map map2=kecunReportYikaiweitiNum.get(y);
						String oilinfo_id=map2.get("OILINFO_ID").toString();
						if(oilinfo_id.equals(OILINFO_ID)){
							map.put("yikaiweiti", map2.get("yikaiweiti"));
						}
					}
				}else{
					map.put("yikaiweiti", 0);
				}
				//关联已开未提量
				if(kecunReportGuanlianYikaiweitiNum.size()>0){
					for(int y=0;y<kecunReportGuanlianYikaiweitiNum.size();y++){
						Map map2=kecunReportGuanlianYikaiweitiNum.get(y);
						String oilinfo_id=map2.get("OILINFO_ID").toString();
						if(oilinfo_id.equals(OILINFO_ID)){
							map.put("guanlianyikaiweiti", map2.get("guanlianyikaiweiti"));
						}
					}
				}else{
					map.put("guanlianyikaiweiti", 0);
				}
				entityList.add(map);
			}
		}
		
		if(entityList.size()>0){
			
			PageInfo pageInfo = new PageInfo(entityList);
		    int num=(int)pageInfo.getTotal();
			
			retMap.put("rows", entityList);
			retMap.put("cusType", session.getAttribute("cusType"));
			
			jsonString = JSONArray.toJSONString(retMap,SerializerFeature.WriteDateUseDateFormat);
		}
		return jsonString;
	}
}
