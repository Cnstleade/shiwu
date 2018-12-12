<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>   
        <el-row class="m20" >
   
               
            <el-col :span="24"   class="col-flex-end">
              <div style="flex-grow:1" class="l20 col-flex">
                     <el-button  icon="el-icon-plus" type="primary" @click="dialogVisible1=true">新增事务</el-button>
                     <el-button class="l20" icon="el-icon-plus" type="primary" @click="xz1">事务类型</el-button>
              </div>                
                    <el-button  type="primary" @click="reset">重置</el-button>
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="关键字"
                          v-model="search.input"
                          >
                        </el-input> 
                    </div>
                    <el-date-picker
                    style="width:340px"
                    class="l20"
                      v-model="search.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>   
                    <el-button @click="handleSearch" class="l20" style="margin-left:20px" icon="el-icon-search"  type="success" circle></el-button>                                                                  
            </el-col>             
        </el-row>
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
             highlight-current-row style="width: 100%;font-weight:bold"
            class="m20"
              v-loading="loading"
            @selection-change="handleSelectionChange"
            id="text"
          >
        
            <el-table-column prop="createUser" label="创建人" fixed align="center"  width="120" ></el-table-column>
            <el-table-column prop="commissionUser" label="待办人" align="center" width="120"  ></el-table-column>          
            <el-table-column prop="createTime" label="创建日期" align="center" width="140"  ></el-table-column>   
            <el-table-column prop="periodicTypeStr" label="事务类型" align="center"  width="100" ></el-table-column>                      
            <el-table-column prop="commissionDate" label="待办日期" align="center" width="140"  >
                    <template slot-scope="scope">
                    {{isNaN(scope.row.commissionDate)?scope.row.commissionDate.length>10?scope.row.commissionDate:'每'+scope.row.commissionDate:'每月'+scope.row.commissionDate+'日'}}
                    </template>               
            </el-table-column>          
            <el-table-column prop="signature" label="短信签名" align="center"  width="140"></el-table-column>   
                       
            <el-table-column prop="content" label="事务内容" align="center"  min-width="200" >
                    <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="top">
                              <span>{{scope.row.content}}</span>
                          </el-tooltip>
                    </template>               
            </el-table-column>          
            <el-table-column prop="cz"  align="center" label="操作" width="240"  >
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="success"
                    @click="handleShow(scope.$index, scope.row)"
                   >详情</el-button>                  
                <el-button
                    size="mini"
                    type="primary"
                    :disabled="username!=scope.row.createUser"
                    @click="handleEdit(scope.$index, scope.row)"
                   >编辑</el-button>
                <el-button
                    size="mini"
                    :type="scope.row.stop?'info':'danger'"
                    :disabled="scope.row.stop"
                    @click="handleDelete(scope.$index, scope.row)"
                   >{{scope.row.stop?'已撤销':'撤销'}}</el-button>                   
                </template> 
            </el-table-column> 
        </el-table>          
        <el-row class="m20" v-if="total>0">

             <div style="float:right">
                 <el-pagination
                   @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                   :current-page="npage"
                    :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="total">
                 </el-pagination>   
             </div>
        </el-row>        
        <el-dialog
          title="新增事务"
          :visible.sync="dialogVisible1"
          center
          width="40%"
          >
            <el-form  :rules="rules" :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" >
              <el-form-item label="待办事项" prop="name">
                <el-input type="textarea" v-model="ruleForm2.name" ></el-input>
              </el-form-item>
               <el-form-item label="活动性质">
                 <el-switch
                  v-model="ruleForm2.huodong"
                  active-text="周期"
                  inactive-text="非周期">
                </el-switch>
              </el-form-item>               
              <el-form-item label="待办人" prop="username" >
                <el-select v-model="ruleForm2.username" placeholder="请选择活动区域" @change="changeUsername">
                    <el-option
                       v-for="item in jbr"
                       :key="item.id"
                       :label="item.staffName"
                       :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机号码" prop='mobile'>
                <el-input v-model="ruleForm2.mobile"></el-input>
              </el-form-item>  
     
              <el-form-item label="提醒时间">
                <el-col :span="11">
                    <el-time-picker
                      v-model="ruleForm2.date2"
                      style="width: 100%;"
                      placeholder="提醒时间">
                    </el-time-picker>                    
                </el-col>
              </el-form-item>    
              <el-form-item label="提醒类型">
                <el-switch
                  v-model="ruleForm2.reminderType"
                  active-text="提醒并办理"
                  inactive-text="仅提醒">
                </el-switch>                
              </el-form-item> 
              <el-form-item label="事务类型" prop="affairTypeId">
                    <el-select  v-model="ruleForm2.affairTypeId" placeholder="事务类型">
                      <el-option
                        v-for="item in hdxz"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                      </el-option>
                    </el-select>                   
            </el-form-item> 
              <el-form-item label="签名" prop="signature">
                    <el-select  v-model="ruleForm2.signature" placeholder="签名">
                      <el-option
                        v-for="item in Sianature"
                        :key="item.id"
                        :label="item.signature"
                        :value="item.id">
                      </el-option>
                    </el-select>                   
            </el-form-item>             
              <!-- <el-form-item label="提醒人电话">
                <el-input v-model="ruleForm2.phone"></el-input>
              </el-form-item> -->

              <template v-if="!ruleForm2.huodong">
                              <el-form-item label="待办时间">
                <el-col :span="11">
                  <el-date-picker type="date" 
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期" 
                  v-model="ruleForm2.data" 
                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              </template>
              <template v-if="ruleForm2.huodong">
              <el-form-item label="周期类型">
                <el-switch
                  v-model="ruleForm2.now"
                  active-text="月"
                  inactive-text="周">
                </el-switch>                
              </el-form-item>  
              <el-form-item  prop='sendDate' >
                  <el-radio-group v-model="ruleForm2.sendDate" v-if="!ruleForm2.now">
                    <el-radio-button label="周一">周一</el-radio-button>
                    <el-radio-button label="周二">周二</el-radio-button>
                    <el-radio-button label="周三">周三</el-radio-button>
                    <el-radio-button label="周四">周四</el-radio-button>
                    <el-radio-button label="周五">周五</el-radio-button>
                    <el-radio-button label="周六">周六</el-radio-button>
                    <el-radio-button label="周日">周日</el-radio-button>
                  </el-radio-group>
                  <el-radio-group v-model="ruleForm2.sendDate" id='rq' v-if="ruleForm2.now">
                    <el-row class="m20">
                      <el-radio-button label="1"> 1</el-radio-button>
                      <el-radio-button label="2"> 2</el-radio-button>
                      <el-radio-button label="3"> 3</el-radio-button>
                      <el-radio-button label="4"> 4</el-radio-button>
                      <el-radio-button label="5"> 5</el-radio-button>
                      <el-radio-button label="6"> 6</el-radio-button>
                      <el-radio-button label="7"> 7</el-radio-button>
                      
                    </el-row>
                    <el-row class="m20">
                      <el-radio-button label="8"> 8</el-radio-button>
                      <el-radio-button label="9"> 9</el-radio-button>
                      <el-radio-button label="10">10</el-radio-button>
                      <el-radio-button label="11">11</el-radio-button>
                      <el-radio-button label="12">12</el-radio-button>
                      <el-radio-button label="13">13</el-radio-button>
                      <el-radio-button label="14">14</el-radio-button>
                
                    </el-row>
                    <el-row class="m20">
                            <el-radio-button label="15">15</el-radio-button>
                      <el-radio-button label="16">16</el-radio-button>
                      <el-radio-button label="17">17</el-radio-button>
                      <el-radio-button label="18">18</el-radio-button>
                      <el-radio-button label="19">19</el-radio-button>
                      <el-radio-button label="20">20</el-radio-button>
                      <el-radio-button label="21">21</el-radio-button>
                  
                    </el-row>
                    <el-row class="m20">
                          <el-radio-button label="22">22</el-radio-button>
                      <el-radio-button label="23">23</el-radio-button>
                      <el-radio-button label="24">24</el-radio-button>
                      <el-radio-button label="25">25</el-radio-button>
                      <el-radio-button label="26">26</el-radio-button>
                      <el-radio-button label="27">27</el-radio-button>
                      <el-radio-button label="28">28</el-radio-button>
                  
                    </el-row>                                                            
                    <el-row class="m20">
                     <el-radio-button label="29">29</el-radio-button>
                      <el-radio-button label="30">30</el-radio-button>
                      <el-radio-button label="31">31</el-radio-button>
                    </el-row>
                  </el-radio-group>                  
              </el-form-item>    
              <el-form-item label="启始区间" prop="time">
                 <el-date-picker
                   v-model="ruleForm2.time"
                   value-format="yyyy-MM-dd HH:mm:ss"
                   type="daterange"
                   range-separator="至"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
                 </el-date-picker>                
              </el-form-item>               
              </template>         
             <!-- <el-form-item>
                
              </el-form-item>                -->
              <!-- <el-form-item label="活动性质">
                <el-select v-model="ruleForm2.type" placeholder="类型">
                    <el-option
                       v-for="item in hdxz"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="预提醒天数" >
                <el-input type="number" v-model.number="ruleForm2.preDays" placeholder="输入值为空则默认预提醒天数为3"></el-input>                
              </el-form-item>              
              <el-form-item label="备注">
                <el-input type="textarea" v-model="ruleForm2.desc"></el-input>
              </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit1">提交</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>

        <el-dialog
          title="编辑事务"
          :visible.sync="dialogVisible2"
          center
          width="40%"
          >
            <el-form  :rules="rules" :model="ruleForm3" status-icon  ref="ruleForm3" label-width="100px" >
              <el-form-item label="待办事项" prop="name">
                <el-input type="textarea" v-model="ruleForm3.name" ></el-input>
              </el-form-item>
               <el-form-item label="活动性质">
                 <el-switch
                  v-model="ruleForm3.huodong"
                  disabled
                  active-text="周期"
                  inactive-text="非周期">
                </el-switch>
              </el-form-item>               
              <el-form-item label="待办人" prop="username" >
                <el-select v-model="ruleForm3.username" placeholder="请选择活动区域" @change="changeUsername3">
                    <el-option
                       v-for="item in jbr"
                       :key="item.id"
                       :label="item.staffName"
                       :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机号码" prop='mobile'>
                <el-input v-model="ruleForm3.mobile"></el-input>
              </el-form-item>  
     
              <el-form-item label="提醒时间">
                <el-col :span="11">
                    <el-time-picker
                      v-model="ruleForm3.date2"
                      style="width: 100%;"
                      placeholder="提醒时间">
                    </el-time-picker>                    
                </el-col>
              </el-form-item>    
              <el-form-item label="提醒类型">
                <el-switch
                  v-model="ruleForm3.reminderType"
                  active-text="提醒并办理"
                  inactive-text="仅提醒">
                </el-switch>                
              </el-form-item> 
              <el-form-item label="事务类型" prop="affairTypeId">
                    <el-select  v-model="ruleForm3.affairTypeId" placeholder="事务类型">
                      <el-option
                        v-for="item in hdxz"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                      </el-option>
                    </el-select>                   
            </el-form-item> 
              <el-form-item label="签名" prop="signature">
                    <el-select  v-model="ruleForm3.signature" placeholder="事务类型">
                      <el-option
                        v-for="item in Sianature"
                        :key="item.id"
                        :label="item.signature"
                        :value="item.id">
                      </el-option>
                    </el-select>                   
            </el-form-item>             


              <template v-if="!ruleForm3.huodong">
                              <el-form-item label="待办时间">
                <el-col :span="11">
                  <el-date-picker type="date" 
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期" 
                  v-model="ruleForm3.data" 
                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              </template>
              <template v-if="ruleForm3.huodong">
              <el-form-item label="周期类型">
                <el-switch
                  v-model="ruleForm2.now"
                  active-text="月"
                  inactive-text="周">
                </el-switch>                
              </el-form-item>  
              <el-form-item  prop='sendDate' >
                  <el-radio-group v-model="ruleForm3.sendDate" v-if="!ruleForm2.now">
                    <el-radio-button label="周一">周一</el-radio-button>
                    <el-radio-button label="周二">周二</el-radio-button>
                    <el-radio-button label="周三">周三</el-radio-button>
                    <el-radio-button label="周四">周四</el-radio-button>
                    <el-radio-button label="周五">周五</el-radio-button>
                    <el-radio-button label="周六">周六</el-radio-button>
                    <el-radio-button label="周日">周日</el-radio-button>
                  </el-radio-group>
                  <el-radio-group v-model="ruleForm3.sendDate" id='rq' v-if="ruleForm2.now">
                    <el-row class="m20">
                      <el-radio-button label="1"> 1</el-radio-button>
                      <el-radio-button label="2"> 2</el-radio-button>
                      <el-radio-button label="3"> 3</el-radio-button>
                      <el-radio-button label="4"> 4</el-radio-button>
                      <el-radio-button label="5"> 5</el-radio-button>
                      <el-radio-button label="6"> 6</el-radio-button>
                      <el-radio-button label="7"> 7</el-radio-button>
                      
                    </el-row>
                    <el-row class="m20">
                      <el-radio-button label="8"> 8</el-radio-button>
                      <el-radio-button label="9"> 9</el-radio-button>
                      <el-radio-button label="10">10</el-radio-button>
                      <el-radio-button label="11">11</el-radio-button>
                      <el-radio-button label="12">12</el-radio-button>
                      <el-radio-button label="13">13</el-radio-button>
                      <el-radio-button label="14">14</el-radio-button>
                
                    </el-row>
                    <el-row class="m20">
                            <el-radio-button label="15">15</el-radio-button>
                      <el-radio-button label="16">16</el-radio-button>
                      <el-radio-button label="17">17</el-radio-button>
                      <el-radio-button label="18">18</el-radio-button>
                      <el-radio-button label="19">19</el-radio-button>
                      <el-radio-button label="20">20</el-radio-button>
                      <el-radio-button label="21">21</el-radio-button>
                  
                    </el-row>
                    <el-row class="m20">
                          <el-radio-button label="22">22</el-radio-button>
                      <el-radio-button label="23">23</el-radio-button>
                      <el-radio-button label="24">24</el-radio-button>
                      <el-radio-button label="25">25</el-radio-button>
                      <el-radio-button label="26">26</el-radio-button>
                      <el-radio-button label="27">27</el-radio-button>
                      <el-radio-button label="28">28</el-radio-button>
                  
                    </el-row>                                                            
                    <el-row class="m20">
                     <el-radio-button label="29">29</el-radio-button>
                      <el-radio-button label="30">30</el-radio-button>
                      <el-radio-button label="31">31</el-radio-button>
                    </el-row>
                  </el-radio-group>                  
              </el-form-item>    
              <el-form-item label="启始区间" prop="time">
                 <el-date-picker
                   v-model="ruleForm3.time"
                   value-format="yyyy-MM-dd HH:mm:ss"
                   type="daterange"
                   range-separator="至"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
                 </el-date-picker>                
              </el-form-item>               
              </template>         
              <el-form-item label="预提醒天数" >
                <el-input type="number" v-model.number="ruleForm3.preDays" placeholder="输入值为空则默认预提醒天数为3"></el-input>                
              </el-form-item>              
              <el-form-item label="备注">
                <el-input type="textarea" v-model="ruleForm3.desc"></el-input>
              </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit2">提交</el-button>
                  <el-button @click="resetForm('ruleForm3')">重置</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>



        <el-dialog
          title="事务日志"
          :visible.sync="dialogVisible3"
          center
          width="60%"
          >
            <el-table
                :data="reportData"  
                border  
                tooltip-effect="dark"
                 highlight-current-row style="width: 100%;font-weight:bold"
                class="m20"
              >
                <el-table-column prop="affairName" fixed label="事务名称" align="center"   ></el-table-column>
                <el-table-column prop="transatorName" label="办理人姓名" align="center"   ></el-table-column>
                <el-table-column prop="transatorTime" label="办理时间" align="center"   ></el-table-column>
                <el-table-column prop="discription" label="办理描述" align="center"   ></el-table-column>
                <el-table-column prop="money" label="金额" align="center"   ></el-table-column>
                <el-table-column prop="creatTime" label="更新时间" align="center"   ></el-table-column>
            </el-table>      
        </el-dialog>  
        <el-dialog
          title="事务完成信息"
          :visible.sync="dialogVisible4"
          center
          width="30%"
          >
        
            <el-form   :rules="rules" :model="ruleForm4" status-icon  ref="ruleForm4" label-width="100px" >
              <el-form-item label="事务名称">
                <el-input v-model="ruleForm4.name" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="待办人">
                <el-select v-model="ruleForm4.username" placeholder="请选择活动区域" disabled>
                    <el-option
                       v-for="item in jbr"
                       :key="item.id"
                       :label="item.staffName"
                       :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="办理时间">
                <el-col :span="11">
    <el-date-picker
      v-model="ruleForm4.date1"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>                  
                  
                </el-col>
              </el-form-item>
              <el-form-item label="所花金额" prop="money">
                <el-input v-model="ruleForm4.money" auto-complete="off"></el-input>
              </el-form-item>              
              <el-form-item label="备注" prop="desc">
                <el-input type="textarea" v-model="ruleForm4.desc"></el-input>
              </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit3">提交</el-button>
                  <el-button @click="resetForm('ruleForm4')">重置</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>  
        <el-dialog
          title="新增事务类型"
          :visible.sync="dialogVisible5"
          center
          width="30%"
          >
        
            <el-form   :rules="rules" :model="ruleForm5" status-icon  ref="ruleForm5" label-width="100px" >
              <el-form-item label="事务名称" prop="names">
                <el-input v-model="ruleForm5.names" ></el-input>
              </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit4">提交</el-button>
                  <el-button @click="dialogVisible5=false">取消</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>   
        <el-dialog
            title="事务详情"
            :visible.sync="dialogVisibleSMS"
            center
            width="58%"
          >  
           
        <el-table
            :data="smsDetails"  
            border  
            style="width: 100%;font-weight:bold"
            class="m20"
            id="text2"
          >
            <el-table-column prop="createUser" label="创建人"  align="center"  width="120" ></el-table-column>
            <el-table-column prop="commissionUser" label="待办人" align="center" width="120"  ></el-table-column>    
            <el-table-column prop="mobile" label="电话" align="center" width="120"  ></el-table-column>          
            <el-table-column prop="createTime" label="创建日期" align="center" width="140"  ></el-table-column>   
            <el-table-column prop="periodicTypeStr" label="事务类型" align="center"  width="100" ></el-table-column>                      
            <el-table-column prop="commissionDate" label="待办日期" align="center" width="140"  >
                    <template slot-scope="scope">
                        {{isNaN(scope.row.commissionDate)?scope.row.commissionDate.length>10?scope.row.commissionDate:'每'+scope.row.commissionDate:'每月'+scope.row.commissionDate+'日'}}
                    </template>               
            </el-table-column>          
            <el-table-column prop="signature" label="短信签名" align="center"  width="140"></el-table-column>   
                       
            <el-table-column prop="content" label="事务内容" align="center"  min-width="200" >
                    <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="top">
                              <span>{{scope.row.content}}</span>
                          </el-tooltip>
                    </template>               
            </el-table-column> 
            <el-table-column prop="remark" label="备注" align="center"  width="100" >
                    <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top">
                              <span>{{scope.row.remark}}</span>
                          </el-tooltip>
                    </template>               
            </el-table-column>               
        </el-table>
               <!-- <el-alert
                  title="事务办理详情"
                  type="success"
                  :closable="false"
                  center
                  class="m20"
                  >
                </el-alert> 
        <el-table
            :data="smsDetails1"  
            border  
            style="width: 100%;font-weight:bold"
            class="m20"
            id="text2"
          >
            <el-table-column prop="id" label="序号"  align="center"  width="60" ></el-table-column>
            <el-table-column prop="transatorName" label="办理人" align="center" width="120"  ></el-table-column>    
            <el-table-column prop="TransatorTime" label="办理时间" align="center" width="120"  ></el-table-column>          
            <el-table-column prop="discription" label="待办描述" align="center" min-width="140"  >
                    <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.discription" placement="top">
                              <span>{{scope.row.discription}}</span>
                          </el-tooltip>
                    </template>               
            </el-table-column>          
            <el-table-column prop="money" label="所花金额" align="center"  width="140"></el-table-column>   
        </el-table> -->
               <el-alert
                  title="发送记录详情"
                  type="success"
                  :closable="false"
                  center
                  class="m20"
                  >
                </el-alert>   
        <el-table
            :data="smsDetails2"  
            border  
            style="width: 100%;font-weight:bold"
            class="m20"
            id="text2"
          >
            <el-table-column prop="commissionDate" label="待办时间" align="center" width="140"  >
                        <template slot-scope="scope">
                        {{scope.row.commissionDate|dateServer}}
                    </template>   
            </el-table-column>          
            <el-table-column prop="planTime" label="计划发送时间" align="center" width="140"  ></el-table-column>   
            <el-table-column prop="actualTime" label="实际发送时间" align="center"  width="100" ></el-table-column>                      
            <el-table-column prop="sendStatus" label="发送结果" align="center" min-width="140"  > </el-table-column>    
             <el-table-column prop="sendStatus" label="操作" align="center" width="200"  >
               <template slot-scope="scope">
                    <el-button size="mini"  type="primary" @click="showshiw(scope.row)">查看描述</el-button>  
                      <el-button size="mini"  type="primary" @click="addshiw(scope.row)">添加描述</el-button>                      
               </template>
               </el-table-column>                   
        </el-table>  
          <el-dialog
              title="办理描述"
              append-to-body
               center
               width="30%"
            :visible.sync="dialogShiwu">
            <el-form  :rules="rules" :model="ruleFormSMS" status-icon  ref="ruleFormSMS" label-width="100px" >
              <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="ruleFormSMS.description" ></el-input>
              </el-form-item>
              <el-form-item label="所用资金" prop="moneys">
                <el-input type="number" v-model="ruleFormSMS.moneys" ></el-input>
              </el-form-item>
              <el-form-item label="办理时间" >
                  <el-date-picker type="date" 
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期" 
                  v-model="ruleFormSMS.transatorTime" 
                  style="width: 100%;"></el-date-picker> 
              </el-form-item>    
               <el-form-item label="是否上传凭证">
                 <el-switch
                  v-model="ruleFormSMS.img"
                  active-text="是"
                  inactive-text="否">
                </el-switch>
              </el-form-item>     
                <el-form-item  v-if="ruleFormSMS.img" label="上传凭证：" >
                 <el-col >
                    <el-upload
                        action="123"
                      class="upload-demo"
                      ref="upload"
                      :limit="1"
                      :on-exceed="handleExceed"
                      :on-change="handleChange"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                      :before-upload="beforeAvatarUpload"
                      list-type="picture"
                      :auto-upload="false" >
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                      <div slot="tip" class="el-upload__tip">（必须上传凭证，且大小为4M以内），且不超过4M</div>
                    </el-upload>                    
                 </el-col>
                </el-form-item>
                <!-- <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>   -->
                <el-form-item>
                  <el-button type="primary" @click="onAddSubmit('ruleFormSMS')">提交</el-button>
                  <el-button @click="changeDialog()">取消</el-button>
      
                </el-form-item>                                        
            </el-form>
                      
          </el-dialog>     
          <el-dialog
              title="描述详情"
              append-to-body
               center
               width="50%"
            :visible.sync="dialogShiwuDetail">
       <el-table
            :data="ShiwuDetail"  
            border  
            style="width: 100%;font-weight:bold"
            class="m20"
            id="text2"
          >
            <el-table-column prop="id" label="序号"  align="center"  width="60" ></el-table-column>
            <el-table-column prop="transatorName" label="办理人" align="center" width="120"  ></el-table-column>    
            <el-table-column prop="transatorTime" label="办理时间" align="center" width="120"  ></el-table-column>          
            <el-table-column prop="discription" label="待办描述" align="center" min-width="140"  >
                    <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.discription" placement="top">
                              <span>{{scope.row.discription}}</span>
                          </el-tooltip>
                    </template>               
            </el-table-column>          
            <el-table-column prop="money" label="所花金额" align="center"  width="140"></el-table-column>   
            <el-table-column prop="money" label="文件路径" align="center"  width="140">
                    <template slot-scope="scope">
                        <a :href="scope.row.fileUrl">路径</a>
                    </template>  
            </el-table-column>
        </el-table> 
                      
          </el-dialog>                                     
        </el-dialog>                                                                       
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import {
  httpSelectAffairTable,
  httpUserNamelist,
  httpSelectAffairLogging,
  httpInsertAffairLogging,
  httpInsertAffair,
  httpUpdateAffair,
  httpGetSianature,
  httpPeriodic,
  httpGetaffairtype,
  httpAddAffairType,
  httpAffairAffairs,
  httpAffairDetails,
  httpAffairLogging,
  httpAffairDelete,
  httpAffairAffairLogs
} from "../../../service/http";
import { timeFormat, sFormat } from "../../../config/time";
export default {
  data() {
    var checkPreDays = (rule, value, callback) => {
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validateUsername = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!reg.test(value)) {
          return callback(
            new Error("请输入4-16位包含大小写字母和数字的用户名！")
          );
        } else {
          callback();
        }
      } else {
        return callback(
          new Error("请输入4-16位包含大小写字母和数字的用户名！")
        );
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
        if (!reg.test(value)) {
          return callback(
            new Error("密码必须由6-16个英文字母和数字的字符串组成！")
          );
        } else {
          callback();
        }
      } else {
        return callback(
          new Error("密码必须由6-16个英文字母和数字的字符串组成！")
        );
      }
    };
    var validateMoney = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/;
        if (!reg.test(value)) {
          return callback(new Error("非零开头的最多带两位小数的数字！"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("非零开头的最多带两位小数的数字！"));
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!reg.test(value)) {
          return callback(new Error("请输入正确邮箱！"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("请输入正确邮箱！"));
      }
    };

    var validateMobile = (rule, value, callback) => {
      var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (value == "") {
        callback(new Error("请输入正确手机号码！"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确手机号码！"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      id: "",
      title: "事务管理",
      search: {},
      tableData: [],
      commissionName: [], //
      creatName: [],
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      dialogVisibleSMS: false,
      dialogShiwu: false,
      dialogShiwuDetail: false,
      fileList: [],
      ruleFormSMS: {},
      npage: 1,
      pageSize: 20,
      total: 0,
      multipleSelection: [], //全选框
      ruleForm2: {
        name: "",
        username: "",
        date1: "",
        date2: "",
        phone: "",
        type: "",
        desc: "",
        stop: false,
        huodong: false,
        now: false
      },
      AffairDetails: [],
      smsDetails: [],
      smsDetails1: [],
      smsDetails2: [],
      ruleForm5: {},
      jbr: [],
      hdxz: [],
      ruleForm3: {},
      reportData: [],
      reporNpage: 0,
      reporPageSize: 5,
      reportTotal: 0,
      ruleForm4: {},
      Sianature: [],
      ShiwuDetail: [],
      rules: {
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入待办事项", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        moneys: [
          { required: true, message: "请输入所用资金", trigger: "blur" }
        ],
        names: [
          { required: true, message: "请输入事务类型名称", trigger: "blur" }
        ],
        reciverName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        senderName: [{ message: "请输入真实姓名", trigger: "blur" }],
        username: [
          { required: true, message: "请选择一个代办人", trigger: "change" }
        ],
        password: [
          { require: true, validator: validatePassword, trigger: "blur" }
        ],
        mobilePhone: [
          { require: true, validator: validateMobile, trigger: "blur" }
        ],
        email: [{ require: true, validator: validateEmail, trigger: "blur" }],
        mobile: [{ require: true, validator: validateMobile, trigger: "blur" }],
        money: [{ require: true, validator: validateMoney, trigger: "blur" }],
        roles: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ],
        signature: [
          {
            required: true,
            message: "请选择发送签名",
            trigger: "change"
          }
        ],
        ssex: [{ required: true, message: "请选择性别", trigger: "change" }],
        deptId: [{ required: true, message: "请选择部门", trigger: "change" }],
        sendStatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        sendPlatform: [
          { required: true, message: "请选择发送平台", trigger: "change" }
        ],
        messageType: [
          { required: true, message: "请选择发送平台", trigger: "change" }
        ],
        affairTypeId: [
          { required: true, message: "请选择事务类型", trigger: "change" }
        ],
        signature: [
          { required: true, message: "请选择签名", trigger: "change" }
        ],
        preDays: [{ validator: checkPreDays, trigger: "blur" }]
      }
    };
  },
  watch: {
    userInfo(val, oldVal) {}
  },
  computed: {
    ...mapState(["userInfo"]),
    getUserIcons() {
      return this.$store.state.userInfo;
    },
    username() {
      let username = sessionStorage.getItem("hsjr_username");
      if (username != "" && username != null && username != "undefined") {
        return username ? username : this.name;
      } else {
        this.$router.push("/login");
      }
    }
  },
  methods: {
    _httpAffairAffairLogs(id) {
      httpAffairAffairLogs(id)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.ShiwuDetail = data.data;
            this.dialogShiwuDetail = true;
          }
        })
        .catch();
    },
    _httpAffairDetails(id, periodicType) {
      httpAffairDetails(id, periodicType).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.smsDetails1 = [];
          this.smsDetails2 = [];
          this.smsDetails1 = data.data.affairLoggingEntities;
          this.smsDetails2 = data.data.affairDetailVOS;
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    _httpAffairDelete(id, periodicType) {
      httpAffairDelete(id, periodicType).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: "撤销成功",
            type: "success"
          });
          this.reset();
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    _httpAddAffairType(val) {
      httpAddAffairType(val)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.init(this.npage, this.pageSize);
            this._httpUserNamelist();
            this._httpFindAllSignature();
            this._httpGetaffairtype();            
            this.dialogVisible5 = false;
          } else if (data.code == 1000) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络错误请联系管理员");
        });
    },
    _httpFindAllSignature() {
      httpGetSianature().then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.Sianature = data.data;
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        }
      });
    },
    _httpGetaffairtype() {
      httpGetaffairtype().then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.hdxz = data.data;
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        }
      });
    },
    hasUser() {
      if (
        this.userInfo == "" &&
        this.userInfo == null &&
        this.userInfo == "undefined"
      ) {
        this.$message.error("当前登陆用户已失效，请重新登陆");
        //    this.$router.push("/login");
        return;
      }
    },
    //事务完成
    _httpInsertAffairLogging(
      affairId,
      transatorId,
      affairName,
      transatorName,
      money,
      discription
    ) {
      this.hasUser();
      httpInsertAffairLogging(
        affairId,
        transatorId,
        affairName,
        transatorName,
        money,
        discription
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });

          this.resetForm("ruleForm4");
          this.dialogVisible4 = false;
          this.init(this.npage, this.pagesize);
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
      });
      //   .catch(err => {
      //     let data = err.response ? err.response.data : {};

      //     if (data.message == "当前登陆用户已失效，请重新登陆") {
      //       this.$message.error(data.message);
      // //      this.$router.push("/login");
      //     } else {
      //       this.$message.error("网络错误请联系管理员");
      //     }
      //   });
    },
    //新增修改用户
    _httpInsertAffair(
      content,
      commissionUserId,
      commissionTime,
      sendTime,
      remark,
      mobile,
      startDate,
      endDate,
      type,
      preDays,
      reminderType,
      affairTypeId,
      signatureId,
      signatureValue,
      commissionDay,
      id
    ) {
      this.hasUser();
      httpPeriodic(
        content,
        commissionUserId,
        commissionTime,
        sendTime,
        remark,
        mobile,
        startDate,
        endDate,
        type,
        preDays,
        reminderType,
        affairTypeId,
        signatureId,
        signatureValue,
        commissionDay,
        id
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.resetForm("ruleForm2");
          this.dialogVisible2 = false;
          this.dialogVisible1 = false;
          this.init(this.npage, this.pagesize);
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
      });
      // .catch(err => {
      //   let data = err.response ? err.response.data : {};

      //   if (data.message == "当前登陆用户已失效，请重新登陆") {
      //     this.$message.error(data.message);
      // //    this.$router.push("/login");
      //   } else {
      //     this.$message.error("网络错误请联系管理员");
      //   }
      // });
    },
    //新增修改用户
    _httpUpdateAffair(
      id,
      name,
      commissionUser,
      commissionUserId,
      commissionTime,
      sendTime,
      type,
      stop,
      commissionAddres,
      mobile,
      endDate,
      startDate
    ) {
      this.hasUser();
      httpUpdateAffair(
        id,
        name,
        commissionUser,
        commissionUserId,
        commissionTime,
        sendTime,
        type,
        stop,
        commissionAddres,
        mobile,
        endDate,
        startDate
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          console.log(data);
          this.resetForm("ruleForm3");
          this.dialogVisible2 = false;
          this.dialogVisible1 = false;
          this.init(this.npage, this.pagesize);
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
      });
      // .catch(err => {
      //   let data = err.response ? err.response.data : {};

      //   if (data.message == "当前登陆用户已失效，请重新登陆") {
      //     this.$message.error(data.message);
      // //    this.$router.push("/login");
      //   } else {
      //     this.$message.error("网络错误请联系管理员");
      //   }
      // });
    },
    init(pageNum, pageSize, keywords, startDate, endDate) {
      let _this = this;
      this.loading = true;
      this.hasUser();
      httpAffairAffairs(pageNum, pageSize, keywords, startDate, endDate).then(
        res => {
          let data = res.data;
          if (data.code == 200) {
            _this.tableData = data.data.list;
            _this.total = data.data.total;
            _this.loading = false;
          } else if (data.code == 1000) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            _this.loading = false;
            this.$message.error(data.msg);
          }
        }
      );
    },
    //得到代办人
    _httpUserNamelist() {
      let _this = this;
      this.hasUser();
      httpUserNamelist().then(res => {
        let data = res.data;
        //  _this.tableData = data.rows;
        _this.jbr = data;
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    reset() {
      this.search = {};
      this.handleSearch();
    },
    handleSearch(type = true) {
      if (type) {
        this.npage = 1;
        this.pagesize = 10;
      }

      if (this.search.time && this.search.time.length) {
        this.init(
          this.npage,
          this.pagesize,
          this.search.input,
          this.search.time[0] + " 00:00:00",
          timeFormat(this.search.time[1], 1)
        );
      } else {
        this.init(this.npage, this.pagesize, this.search.input, "", "");
      }
    },
    onSubmit3() {
      this.hasUser();
      let _this = this;
      this.$refs["ruleForm4"].validate(valid => {
        if (valid) {
          _this._httpInsertAffairLogging(
            this.ruleForm4.id,
            this.ruleForm4.username,
            this.ruleForm4.name,
            this.ruleForm4.date1,
            this.ruleForm4.money,
            this.ruleForm4.desc
          );
        } else {
          return false;
        }
      });
    },
    onSubmit1() {
      let _this = this;
      let jbrId;
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          let signatureValue;
          this.Sianature.forEach(v => {
            if (v.id == _this.ruleForm2.signature) {
              return (signatureValue = v.signature);
            }
          });
          _this._httpInsertAffair(
            _this.ruleForm2.name,
            _this.ruleForm2.username,
            _this.ruleForm2.huodong ? "" : this.ruleForm2.data,
            sFormat(_this.ruleForm2.date2),
            _this.ruleForm2.desc,
            _this.ruleForm2.mobile,
            _this.ruleForm2.time ? _this.ruleForm2.time[0] : "",
            _this.ruleForm2.time ? _this.ruleForm2.time[1] : "",
            _this.ruleForm2.huodong ? (_this.ruleForm2.now ? 2 : 1) : 3,
            _this.ruleForm2.preDays,
            _this.ruleForm2.reminderType ? 1 : 2,
            _this.ruleForm2.affairTypeId,
            _this.ruleForm2.signature,
            signatureValue,
            _this.ruleForm2.huodong
              ? _this.ruleForm2.now
                ? _this.ruleForm2.sendDate
                : _this.ruleForm2.sendDate
              : ""
          );
        } else {
          return false;
        }
      });
    },
    onSubmit2() {
      let _this = this;
      let jbrId;
      for (let a = 0; a < this.jbr.length; a++) {
        if (_this.ruleForm3.username == this.jbr[a].id) {
          jbrId = this.jbr[a].staffName;
        }
      }
      this.$refs["ruleForm3"].validate(valid => {
        if (valid) {
          let signatureValue;
          this.Sianature.forEach(v => {
            if (v.id == _this.ruleForm3.signature) {
              return (signatureValue = v.signature);
            }
          });
          _this._httpInsertAffair(
            _this.ruleForm3.name,
            _this.ruleForm3.username,
            _this.ruleForm3.huodong ? "" : this.ruleForm3.data,
            sFormat(_this.ruleForm3.date2),
            _this.ruleForm3.desc,
            _this.ruleForm3.mobile,
            _this.ruleForm3.time ? _this.ruleForm3.time[0] : "",
            _this.ruleForm3.time ? _this.ruleForm3.time[1] : "",
            _this.ruleForm3.huodong ? (_this.ruleForm3.now ? 2 : 1) : 3,
            _this.ruleForm3.preDays,
            _this.ruleForm3.reminderType ? 1 : 2,
            _this.ruleForm3.affairTypeId,
            _this.ruleForm3.signature,
            signatureValue,
            _this.ruleForm3.huodong
              ? _this.ruleForm3.now
                ? _this.ruleForm3.sendDate
                : _this.ruleForm3.sendDate
              : "",
            _this.ruleForm3.id
          );
        } else {
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   console.log(this.$refs[formName]);
    //   formName = {};
    // },
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch(false);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleSearch(false);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      // {
      //   // affairTypeId: 1;
      //   commissionDate: "周二";
      //   commissionDay: "周二";
      //   commissionUser: "张文艳";
      //   commissionUserId: 55;
      //   content: "张文艳测试周期事务";
      //   createTime: "2018-08-30 14:40:58";
      //   createTimeStr: "2018-08-30 06:40:58";
      //   createUser: "admin";
      //   createUserId: 1;
      //   endDate: "2018-09-30 00:00:00.0";
      //   id: 2;
      //   mobile: "13638825100";
      //   periodicType: 1;
      //   periodicTypeStr: "周期事务";
      //   preDays: 3;
      //   remark: "";
      //   reminderType: 2;
      //   sendTime: "14:40:42";
      //   signature: "【恒舜财富】";
      //   startDate: "2018-08-30 00:00:00.0";
      //   stop: false;
      //   type: 1;
      // }

      this.ruleForm3 = {
        preDays: row.preDays,
        signature: row.signatureId,
        reminderType: row.reminderType == 1 ? false : true,
        affairTypeId: row.affairTypeId,
        commissionDate: row.commissionDate,
        id: row.id,
        name: row.content,
        username: row.commissionUserId,
        date1: "",
        date2: "",
        mobile: row.mobile,
        type: "",
        desc: row.remark,
        stop: row.stop == "true" ? true : false,
        huodong: row.periodicType == 1 ? true : false,
        now: row.type == 1 ? false : true,
        sendDate:
          row.type == 1 ? row.commissionDay : parseInt(row.commissionDay),
        data: row.commissionDate,
        date2: new Date(
          2018,
          7,
          17,
          row.sendTime.split(":")[0],
          row.sendTime.split(":")[1],
          row.sendTime.split(":")[2]
        ),
        desc: row.commissionAddres,
        time: row.periodicType == 1 ? [row.startDate, row.endDate] : []
      };
      this.id = row.id;
      this.dialogVisible2 = true;
    },
    //得到日志
    _httpSelectAffairLogging(affairId, pageNum, pageSize) {
      let _this = this;
      httpSelectAffairLogging(affairId, pageNum, pageSize).then(res => {
        let data = res.data;
        if (data.code == 200) {
          //  _this.tableData = data.data.rows;
          _this.reportData = data.data.rows;
          _this.reportTotal = data.total;
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
      });
      //   .catch(err => {
      //     let data = err.response ? err.response.data : {};

      //     if (data.message == "当前登陆用户已失效，请重新登陆") {
      //       this.$message.error(data.message);
      //  //     this.$router.push("/login");
      //     } else {
      //       this.$message.error("网络错误请联系管理员");
      //     }
      //   });
    },
    //展示日志
    // handleShow(index, row) {
    //   this.hasUser();
    //   let affairId = row.id;
    //   this._httpSelectAffairLogging(
    //     row.id,
    //     this.reporNpage,
    //     this.reporPageSize
    //   );
    //   this.dialogVisible3 = true;
    // },
    //完成事务
    handleTrue(index, row) {
      this.hasUser();
      console.log(JSON.stringify(row));
      this.dialogVisible4 = true;
      this.ruleForm4 = {
        id: row.id,
        name: row.name,
        username: row.commissionUserId
      };
    },
    filterStop(value, row, column) {
      return row.stop == value;
    },
    // //提交完成
    // _httpInsertAffairLogging(
    //   affairId,
    //   transatorId,
    //   affairName,
    //   transatorName,
    //   money,
    //   discription
    // ) {
    //   httpInsertAffairLogging(
    //     affairId,
    //     transatorId,
    //     affairName,
    //     transatorName,
    //     money,
    //     discription
    //   )
    //     .then(res => {
    //       let data = res.data;
    //       if (data) {
    //         this.$message({
    //           message: "完成提交成功",
    //           type: "success"
    //         });
    //       }
    //     })
    //     .catch();
    // },
    filterStatus(value, row, column) {
      return row.Status == value;
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm2 = {
        name: "",
        username: "",
        date1: "",
        date2: "",
        phone: "",
        type: "",
        desc: "",
        stop: false,
        huodong: false,
        now: false
      };
    },
    changeUsername(val) {
      let mobile;
      this.jbr.forEach(v => {
        if (v.id == val) {
          mobile = v.mobile;
          return;
        }
      });
      this.ruleForm2.mobile = mobile;
    },
    changeUsername3(val) {
      let mobile;
      this.jbr.forEach(v => {
        if (v.id == val) {
          mobile = v.mobile;
          return;
        }
      });
      this.ruleForm3.mobile = mobile;
    },
    xz1() {
      this.dialogVisible5 = true;
      this.ruleForm5 = {};
    },
    onSubmit4() {
      this.$refs["ruleForm5"].validate(valid => {
        if (valid) {
          this._httpAddAffairType(this.ruleForm5.names);
        }
      });
    },
    handleShow(index, row) {
      this.dialogVisibleSMS = true;
      this.smsDetails = [];
      this.smsDetails.push(JSON.parse(JSON.stringify(row)));
      this._httpAffairDetails(row.id, row.periodicType);
    },
    handleDelete(index, row) {
      let id = row.id;
      let _this = this;
      this.$confirm("此操作将撤销该短信, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this._httpAffairDelete(row.id, row.periodicType);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤销"
          });
        });
    },
    beforeAvatarUpload(file) {
      //将文件 的所有的内容都添加在这一起上传
      let fd = new FormData();
      fd.append("file", file);
      fd.append("affairId", this.ruleFormSMS.id); //其他参数
      fd.append("description", this.ruleFormSMS.description); //其他参数
      fd.append("money", this.ruleFormSMS.moneys); //其他参数
      fd.append("transatorTime", this.ruleFormSMS.transatorTime); //其他参数
      // fd.append("actualPayBackAmt", Number(this.editForm.actualPayBackAmt)); //其他参数
      // fd.append("remark", this.editForm.remark); //其他参数
      // console.log(fd);
      // const isJPG = /image\/\w+/.test(file.type);
      // const isLt2M = file.size / 1024 / 1024 < 4;

      // if (!isJPG) {
      //   this.$message.error("必须上传图片!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 4MB!");
      // }
      // return isJPG && isLt2M;
      var re = /\w+\.(txt|xlsx)/;
      const isJPG = re.test(file.name);
      const isLt2M = file.size / 1024 / 1024 < 4;

      // if (!isJPG) {
      //   return this.$message.error("上传头像图片只能是 txt和xlsx格式!");
      // }
      if (!isLt2M) {
        return this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (!file) {
        return this.$message.error("请上传文本");
      }

      axios.post("/affair/affairLogging", fd, {}).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
        this._httpAffairDetails(
          this.smsDetails[0].id,
          this.smsDetails[0].periodicType
        );
        this.dialogShiwu = false;
      });

      return isJPG && isLt2M;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleChange(file, fileList) {},
    changeDialog() {
      this.dialogShiwu = false;
      this.resetForm("ruleFormSMS");
    },
    onAddSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleFormSMS.img) {
            this.$refs.upload.submit();
          } else {
            httpAffairLogging(
              this.ruleFormSMS.id,
              this.ruleFormSMS.description,
              this.ruleFormSMS.moneys,
              this.ruleFormSMS.transatorTime,
              ''
            )
              .then(res => {
                let data = res.data;
                if (data.code == 200) {
                  this.$message({
                    message: "新增成功",
                    type: "success"
                  });
                } else if (data.code == 1000) {
                  this.$message.error(data.msg);
                  this.$router.push("/login");
                } else {
                  this.$message.error(data.msg);
                }
                this.dialogShiwu = false;
                this._httpAffairDetails(
                  this.smsDetails[0].id,
                  this.smsDetails[0].periodicType
                );
              })
              .catch(err => {
                this.$message.error("网络错误，请联系管理员");
              });
          }
        } else {
          return false;
        }
      });
    },
    addshiw(row) {
      this.ruleFormSMS = { id: row.id };
      this.dialogShiwu = true;
    },
    showshiw(row) {
      this._httpAffairAffairLogs(row.id);
    }
  },
  mounted() {
    this.init(this.npage, this.pageSize);
    this._httpUserNamelist();
    this._httpFindAllSignature();
    this._httpGetaffairtype();
  }
};
</script>

<style>
#text .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#text2 .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#rq span {
  width: 45px;
}
</style>