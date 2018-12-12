<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>   
        <el-row class="m20 col-flex-end" >
            
              <div style="flex-grow:1" class="l20">
                    <el-button  icon="el-icon-plus" type="primary" size="small" @click="dialogVisible1=true" >新增</el-button>
           </div>
                  <el-button class="l20 " type="danger" @click="download" size="small" >下载模板</el-button>
                  <div class="l20 " >
                    <el-upload
              
                      class="upload-demo flex"
                      ref="upload"
                      action="123"
                      :before-upload="beforeAvatarUpload"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      :auto-upload="false">

                      <el-button class="l20" slot="trigger" size="small" type="primary">选取文件</el-button>

                      <el-button class="l20" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    </el-upload> 
                  </div>
               
    
         
                    <el-button class="l20" type="primary" @click="reset" style="margin-left: 10px;">重置</el-button>
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入关键字"
                          v-model="search.keywords"
                          clearable>
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
                    
        </el-row>
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
             highlight-current-row style="width: 100%;font-weight:bold"
            class="m20"
                v-loading="loading"
                id="text"
          >
            <el-table-column prop="id" fixed label="序号" align="center" width="70"  sortable></el-table-column>
             <el-table-column prop="createTimeStr" label="创建时间" align="center" width="160" ></el-table-column>
            <el-table-column prop="sendTimeStr" label="发送时间" align="center" width="100" ></el-table-column>
            <el-table-column prop="sendDate" label="发送日期" align="center" width="100" >
                    <template slot-scope="scope">
                        {{isNaN(scope.row.sendDate)?'每'+scope.row.sendDate:'每月'+scope.row.sendDate+'日'}}
                    </template> 
            </el-table-column>
            <el-table-column prop="beginDateStr" label="开始日期" align="center" width="120" ></el-table-column>
              <el-table-column prop="endDateStr" label="结束日期" align="center" width="120" ></el-table-column>            
            <el-table-column prop="mobilePhone" label="手机" align="center" width="120" ></el-table-column>
              <el-table-column prop="cycleTypeStr" label="周期" align="center" width="60" ></el-table-column>            
            <el-table-column prop="sendStatusStr" label="状态" align="center" width="100" 
                    >
        
                   
              
            </el-table-column>
            <el-table-column prop="receiverName" label="接收人姓名" align="center" width="100" ></el-table-column>
            <!-- <el-table-column prop="uploader" label="上传人" align="center" width="100" ></el-table-column> -->
            <!-- <el-table-column prop="senderName" label="备注" align="center" ></el-table-column> -->
            <!-- <el-table-column prop="sendPlatform" label="发送平台" align="center"  width="100" 
             :filters="[{ text: '华信', value: '1' }, { text: '创蓝', value: '2' }]" :filter-method="filterSendPlatform" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ===1?'success':'danger'">
                          {{ scope.row.sendPlatform ===1?'华信':'创蓝' }}
                        </el-tag>
                    </template> 

            </el-table-column> -->
            <!-- <el-table-column prop="sendPlatform" label="签名" align="center"  width="100" 
             :filters="[{ text: '华信', value: '1' }, { text: '创蓝', value: '2' }]" :filter-method="filterSendPlatform" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ===1?'success':'danger'">
                          {{ scope.row.sendPlatform ===1?'华信':'创蓝' }}
                        </el-tag>
                    </template> 

            </el-table-column>            -->
            <el-table-column prop="messageContent" label="消息内容" align="center"  width="200">
                    <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.messageContent" placement="top">
                              <span>{{scope.row.messageContent}}</span>
                          </el-tooltip>
                    </template> 
            </el-table-column>
            <el-table-column prop="messageTypeStr" label="短信类型" align="center" width="100"
                    >
                    <!-- <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.messageType ===1?'success':scope.row.messageType===2?'info':'danger'">
                          {{ scope.row.messageType ===1?'下款':scope.row.messageType ===2?'还款':'还本' }}
                        </el-tag>
                    </template>  -->
              
            </el-table-column>
            <el-table-column prop="signatureTypeStr" label="签名" align="center" ></el-table-column>            
            <el-table-column prop="cz"  align="center" label="操作" width="200"  >
                <template slot-scope="scope">
                <!-- <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                   >编辑</el-button> -->
               <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                   >详情</el-button> 
                <el-button
                    size="mini"
                    type="danger"
                    :disabled="scope.row.recordStatusStr=='已删除'"
                    @click="handleDelete(scope.$index, scope.row)"
                   >{{scope.row.recordStatusStr=='已删除'?'已撤销':'撤销'}}</el-button>                   
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
                     :page-size="pagesize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="total">
                 </el-pagination>   
             </div>
        </el-row>  
       <el-dialog
          title="新增短信"
          :visible.sync="dialogVisible1"
          center
          width="35%"
          >
            <el-form :rules="rules" :model="ruleForm3" status-icon  ref="ruleForm3" label-width="100px" >
              <el-form-item label="接收人姓名" prop='receiverName'>
                <el-input v-model="ruleForm3.receiverName" ></el-input>
              </el-form-item>
              <el-form-item label="接收人电话" prop='mobilePhone'>
                <el-input v-model="ruleForm3.mobilePhone"></el-input>
              </el-form-item>  
              <el-form-item label="周期类型">
                <el-switch
                  v-model="ruleForm3.now"
                  active-text="月"
                  inactive-text="周">
                </el-switch>                
              </el-form-item>  
              <el-form-item label="发送日期" prop='sendDate' >
                  <el-radio-group v-model="ruleForm3.sendDate" v-if="!ruleForm3.now">
                    <el-radio-button label="周一">周一</el-radio-button>
                    <el-radio-button label="周二">周二</el-radio-button>
                    <el-radio-button label="周三">周三</el-radio-button>
                    <el-radio-button label="周四">周四</el-radio-button>
                    <el-radio-button label="周五">周五</el-radio-button>
                  </el-radio-group>
                  <el-radio-group v-model="ruleForm3.sendDate" id='rq' v-if="ruleForm3.now">
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
              <el-form-item label="发送时间" prop="sendTime">
                <el-time-picker
              
                  v-model="ruleForm3.sendTime"
          
                  placeholder="发送时间">
                </el-time-picker>                           
              </el-form-item>  
              <el-form-item label="启始区间" prop="time">
                 <el-date-picker
                   v-model="ruleForm3.time"
                   value-format="yyyy-MM-dd"
                   type="daterange"
                   range-separator="至"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
                 </el-date-picker>                
              </el-form-item>
              <!-- <el-form-item label="发送状态" prop="status" >
                    <el-select  v-model="ruleForm3.status" placeholder="发送状态">
                      <el-option
                        v-for="item in sendStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>                -->
              <el-form-item label="短信类型" prop="messageType">
                    <el-select  v-model="ruleForm3.messageType" placeholder="短信类型">
                      <el-option
                        v-for="item in messageType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>                
              <!-- <el-form-item label="发送人" prop="senderName">
                <el-input v-model="ruleForm3.senderName" ></el-input>
              </el-form-item>    -->
 
              <el-form-item label="发送签名" prop="signatureType">
                    <el-select  v-model="ruleForm3.signatureType" placeholder="发送签名">
                      <!-- <el-option
                        v-for="item in signatureType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option> -->
                      <el-option
                        v-for="item in Sianature"
                        :key="item.id"
                        :label="item.signature"
                        :value="item.id">
                      </el-option>                      
                    </el-select> 
              </el-form-item>  
              <el-form-item label="消息内容" prop="messageContent">
                <el-input type="textarea" v-model="ruleForm3.messageContent"></el-input>
              </el-form-item>   
             <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" v-model="ruleForm3.remarks"></el-input>
              </el-form-item>                         
              <!-- <el-form-item label="短信类型" prop="messageType">
                    <el-select  v-model="ruleForm3.messageType" placeholder="短信类型">
                      <el-option
                        v-for="item in messageType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>                              -->
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm3')">提交</el-button>
                  <el-button @click="resetForm('ruleForm3')">重置</el-button>
                </el-form-item>
            </el-form>       
      </el-dialog>    
       <el-dialog
          title="短信详情"
          :visible.sync="dialogVisible2"
          center
          width="60%"
          >
        <el-row>
          <el-button  icon="el-icon-plus" type="primary" @click="open" >短信来源</el-button>
        </el-row>  
        <el-table
            :data="ruleFormData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
             highlight-current-row style="width: 100%;font-weight:bold"
            class="m20"
                v-loading="loading"
          >
  <el-table-column prop="id" label="序号" fixed align="center" width="70"  sortable></el-table-column>
            <el-table-column prop="sendTimeStr" label="发送时间" align="center" width="100" >

            </el-table-column>
            <el-table-column prop="sendDate" label="发送日期" align="center" width="100" >
                    <template slot-scope="scope">
                        {{isNaN(scope.row.sendDate)?'每'+scope.row.sendDate:'每月'+scope.row.sendDate+'日'}}
                    </template>               
            </el-table-column>
            <el-table-column prop="beginDateStr" label="开始日期" align="center" width="120" ></el-table-column>
              <el-table-column prop="endDateStr" label="结束日期" align="center" width="120" ></el-table-column>            
            <el-table-column prop="mobilePhone" label="手机" align="center" width="120" ></el-table-column>
              <el-table-column prop="cycleTypeStr" label="周期" align="center" width="60" ></el-table-column>            
            <el-table-column prop="sendStatusStr" label="状态" align="center" width="100" 
                    >
        
                   
              
            </el-table-column>
            <el-table-column prop="receiverName" label="接收人姓名" align="center" width="100" ></el-table-column>
            <!-- <el-table-column prop="uploader" label="上传人" align="center" width="100" ></el-table-column> -->
            <!-- <el-table-column prop="senderName" label="备注" align="center" ></el-table-column> -->
            <!-- <el-table-column prop="sendPlatform" label="发送平台" align="center"  width="100" 
             :filters="[{ text: '华信', value: '1' }, { text: '创蓝', value: '2' }]" :filter-method="filterSendPlatform" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ===1?'success':'danger'">
                          {{ scope.row.sendPlatform ===1?'华信':'创蓝' }}
                        </el-tag>
                    </template> 

            </el-table-column> -->
            <!-- <el-table-column prop="sendPlatform" label="签名" align="center"  width="100" 
             :filters="[{ text: '华信', value: '1' }, { text: '创蓝', value: '2' }]" :filter-method="filterSendPlatform" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ===1?'success':'danger'">
                          {{ scope.row.sendPlatform ===1?'华信':'创蓝' }}
                        </el-tag>
                    </template> 

            </el-table-column>            -->
            <!-- <el-table-column prop="messageContent" label="消息内容" align="center"  width="240"></el-table-column> -->
            <el-table-column prop="messageTypeStr" label="短信类型" align="center" width="100"
                    >
                    <!-- <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.messageType ===1?'success':scope.row.messageType===2?'info':'danger'">
                          {{ scope.row.messageType ===1?'下款':scope.row.messageType ===2?'还款':'还本' }}
                        </el-tag>
                    </template>  -->
              
            </el-table-column>
            <el-table-column prop="signatureTypeStr" label="签名" align="center" ></el-table-column>        

                    
        </el-table>  
                    <el-card shadow="hover" class="m20" v-if="ruleFormData[0]">
                 <strong style="display:inline-block;width:80px;margin-right:20px">消息内容:</strong> <i>{{ruleFormData[0].messageContent}}</i> 
            </el-card> 
            <el-card shadow="hover" class="m20" v-if="ruleFormData[0]">
                 <strong style="display:inline-block;width:80px;margin-right:20px">备注:</strong><i>{{ruleFormData[0].senderName}}</i> 
            </el-card>    
               <el-alert
                  title="发送记录详情"
                  type="success"
                  :closable="false"
                  center
                  class="m20"
                  >
                </el-alert>                      
        <el-table
            :data="ruleForm"  
            border  
            ref="ruleFormData" 
            tooltip-effect="dark"
             highlight-current-row style="width: 100%;font-weight:bold"
            class="m20"
          >
               <el-table-column
        fixed
      label="任务批次"
      prop="number"
      align=center
      width="100">
    </el-table-column>  
           <!-- <el-table-column prop="sendStatusStr" label="发送状态" align="center" width="100" ></el-table-column> -->
           <!-- <el-table-column prop="messageContent" label="消息内容" align="center" width="300"></el-table-column> -->
           <!-- <el-table-column prop="remarks" label="备注" align="center" width="300"></el-table-column> -->
           <!-- <el-table-column prop="uploader" label="创建人" align="center"  ></el-table-column> -->
           <!-- <el-table-column prop="createTime" label="创建时间" align="center"   width="140"></el-table-column> -->
           <!-- <el-table-column prop="signatureTypeStr" label="签名类型" align="center"  ></el-table-column> -->
           <el-table-column prop="planSendTime" label="计划发送时间" align="center"  width="140" >
              <template slot-scope="scope">
                    {{scope.row.planSendTime|dateServer}}
                </template>  
           </el-table-column>
           <el-table-column prop="actualSendTime" label="实际发送时间" align="center"  width="140" >
              <template slot-scope="scope">
                <template v-if="scope.row.actualSendTime">
                    {{scope.row.actualSendTime|dateServer}}
                </template>
                </template>  
           </el-table-column>
           <!-- <el-table-column prop="signatureTypeStr" label="短信类型" align="center"   ></el-table-column> -->
           <el-table-column prop="sendStatusStr" label="发送状态" align="center"  width="100" ></el-table-column>
           <el-table-column prop="sendTimes" label="发送次数" align="center"  width="100" ></el-table-column>
   
           <!-- <el-table-column prop="" label="发送次数" align="center"   width="140"></el-table-column> -->
           <el-table-column prop="message" label="返回信息" align="center"   ></el-table-column>
                
           <!--  <el-table-column type="expand" label="短信详情" width="80" >
              <template slot-scope="props"  >
                <el-alert
                  title="发送记录详情"
                  type="success"
                  :closable="false"
                  center
                  >
                </el-alert>
                <el-table
                  :data="props.row.messagerRecordings"
                  border  
                   highlight-current-row style="width: 100%;font-weight:bold"
                  >
                    <el-table-column prop="sendstatus" label="发送状态" align="center"  width="120" ></el-table-column>
                    <el-table-column prop="sendTime" label="发送时间" align="center"   width="140"></el-table-column>
                    <el-table-column prop="sendPlatform" label="发送平台" align="center"   width="120"></el-table-column>
                    <el-table-column prop="message" label="返回信息" align="center"   ></el-table-column>
                </el-table>
              </template>
            </el-table-column>   -->          
        </el-table>          
            <!-- <el-card class="box-card m20">
              <div  class="text item">
                <strong >接受人姓名:</strong>{{ruleForm.receiverName}}
              </div>
              <div  class="text item">
                <strong >接收人电话:</strong>{{ruleForm.mobilePhone}}
              </div>
              <div  class="text item">
                <strong >发送时间:</strong>{{ruleForm.sendTime}}
              </div>
              <div  class="text item">
                <strong >发送状态:</strong>{{ruleForm.sendStatusStr}}
              </div>
              <div  class="text item">
                <strong >消息内容:</strong>{{ruleForm.messageContent}}
              </div>
              <div  class="text item">
                <strong >创建人:</strong>{{ruleForm.uploader}}
              </div>
              <div  class="text item">
                <strong >创建时间:</strong>{{ruleForm.createTime}}
              </div> 
              <div  class="text item">
                <strong >备注:</strong>{{ruleForm.remarks}}
              </div>                                                                                                  
              <div  class="text item">
                <strong >签名类型:</strong>{{ruleForm.signatureTypeStr}}
              </div>               
              <div  class="text item">
                <strong >状态:</strong>{{ruleForm.recordStatusStr}}
              </div> 
              <div  class="text item">
                <strong >短信类型:</strong>{{ruleForm.messageTypeStr}}
              </div> 
              <div  class="text item">
                <strong >发送次数:</strong>{{ruleForm.sendTimes}}
              </div>                                           
              <div  class="text item">
                <strong >发送状态:</strong>{{ruleForm.SMSsendstatus}}
              </div> 
              <div  class="text item">
                <strong >发送时间:</strong>{{ruleForm.SMSsendTime}}
              </div>  
              <div  class="text item">
                <strong >发送平台:</strong>{{ruleForm.SMSsendPlatform}}
              </div>  
              <div  class="text item">
                <strong >返回信息提示:</strong>{{ruleForm.SMSmessage}}
              </div>                                                         
            </el-card>           -->
            <!-- <el-form :rules="rules" :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" >
              <el-form-item label="接收人姓名" prop='receiverName'>
                <el-input v-model="ruleForm.receiverName" ></el-input>
              </el-form-item>
              <el-form-item label="接收人电话" prop='mobilePhone'>
                <el-input v-model="ruleForm.mobilePhone"></el-input>
              </el-form-item>  
              <el-form-item label="周期类型">
                <el-switch
                  v-model="ruleForm.now"
                  active-text="月"
                  inactive-text="周">
                </el-switch>                
              </el-form-item>  
              <el-form-item  prop='sendDate' >
                  <el-radio-group v-model="ruleForm.sendDate" v-if="!ruleForm3.now">
                    <el-radio-button label="周一">周一</el-radio-button>
                    <el-radio-button label="周二">周二</el-radio-button>
                    <el-radio-button label="周三">周三</el-radio-button>
                    <el-radio-button label="周四">周四</el-radio-button>
                    <el-radio-button label="周五">周五</el-radio-button>
                  </el-radio-group>
                  <el-radio-group v-model="ruleForm.sendDate" id='rq' v-if="ruleForm3.now">
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
              <el-form-item label="发送时间" prop="sendTime">
                <el-time-picker
                 value-format="hh:mm:ss"
                  v-model="ruleForm.sendTime"
                  placeholder="发送时间">
                </el-time-picker>                           
              </el-form-item>  
               <el-form-item label="创建时间" prop="time">
                 <el-date-picker
                   v-model="ruleForm.createTime"
                   value-format="yyyy-MM-dd hh:mm:ss"
                   type="daterange"
                   range-separator="至"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
                 </el-date-picker>                
              </el-form-item>              
   
              <el-form-item label="短信类型" prop="messageType">
                    <el-select  v-model="ruleForm.messageType" placeholder="短信类型">
                      <el-option
                        v-for="item in messageType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>                
          

              <el-form-item label="发送签名" prop="signatureType">
                    <el-select  v-model="ruleForm.signatureType" placeholder="发送签名">
                      <el-option
                        v-for="item in signatureType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>  
              <el-form-item label="消息内容" prop="messageContent">
                <el-input type="textarea" v-model="ruleForm.messageContent"></el-input>
              </el-form-item>     
              <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
              </el-form-item>                       

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>        -->
      </el-dialog>                                             
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { timeFormat, sFormat } from "../../../config/time";
import {
  httpGifCode,
  httpGetPeriodicMessage,
  httpSmsPeriodicMessage,
  httpDownload,
  httpSmsDetails,
  httpSmsDelete,
  httpGetSianature
} from "../../../service/http";
export default {
  data() {
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
      var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/;
      console.log(value);
      if (value == "") {
        callback(new Error("请输入正确手机号码！"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确手机号码！"));
      } else {
        callback();
      }
    };
    return {
      title: "周期短信",
      url: "",
      search: {
        time: [],
        keywords: ""
      },
      dialogVisible1: false,
      dialogVisible2: false,
      fileList: [],
      tableData: [],
      Sianature: [],
      loading: false,
      npage: 1,
      pagesize: 10,
      total: 0,
      ruleForm3: { signatureType: 1 },
      ruleForm: [],
      ruleFormData: [],
      messageType: [
        { label: "下款", value: 1 },
        { label: "还款", value: 2 },
        { label: "还本", value: 3 },
        { label: "付息提醒", value: 4 },
        { label: "付本提醒", value: 5 },
        { label: "其他", value: 6 }
      ],
      signatureType: [
        { label: "恒舜金融", value: 1 },
        { label: "恒舜普惠", value: 2 },
        { label: "恒舜财富", value: 3 }
      ],
      rules: {
        receiverName: [
          { required: true, message: "请输入接收姓名", trigger: "blur" }
        ],
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        sendTime: [
          { required: true, message: "请输入发送时间", trigger: "blur" }
        ],
        sendDate: [
          { required: true, message: "请选择一个日期", trigger: "blur" }
        ],
        remarks: [{ message: "请选择备注", trigger: "blur" }],
        messageContent: [
          { required: true, message: "请选择备注", trigger: "blur" }
        ],
        time: [{ required: true, message: "请选择发送区间", trigger: "blur" }],
        reciverName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        senderName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        senderName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        username: [
          { require: true, validator: validateUsername, trigger: "blur" }
        ],
        username: [
          { require: true, validator: validateUsername, trigger: "blur" }
        ],
        password: [
          { require: true, validator: validatePassword, trigger: "blur" }
        ],
        mobilePhone: [
          { require: true, validator: validateMobile, trigger: "blur" }
        ],
        email: [{ require: true, validator: validateEmail, trigger: "blur" }],
        mobilePhone: [
          { require: true, validator: validateMobile, trigger: "blur" }
        ],
        roles: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ],
        signatureType: [
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
        ]
      },
      chbname: ""
    };
  },
  computed: {
    username() {
      let username = sessionStorage.getItem("hsjr_username");
      if (username != "" && username != null && username != "undefined") {
        return username ? username : "";
      } else {
        this.$router.push("/login");
      }
    },

    ...mapState(["userInfo"])
  },
  watch: {
    userInfo(a, b) {
      // while (a == "" && a == null && a == "undefined") {
      //   this.$router.push("/login");
      // }
      console.log(a, b);
    }
  },
  methods: {
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
    //撤销短信
    _httpSmsDelete(id) {
      let _this = this;
      httpSmsDelete(id).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
        }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
        this.init(this.npage, this.pagesize);
      });
    },
    //获取短信详情接口
    _httpSmsDetails(id) {
      httpSmsDetails(id).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.ruleForm = data.data;

          this.dialogVisible2 = true;
        }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    download() {
      window.open(
        "http://paxfivrd0.bkt.clouddn.com/EXCEL20180731105752611%20%281%29.xls"
      );
    },
    _httpSmsPeriodicMessage(
      receiverName,
      messageType,
      sendDate,
      messageContent,
      endDate,
      signatureType,
      mobilePhone,
      sendTime,
      remarks,
      cycleType,
      beginDate
    ) {
      httpSmsPeriodicMessage(
        receiverName,
        messageType,
        sendDate,
        messageContent,
        endDate,
        signatureType,
        mobilePhone,
        sendTime,
        remarks,
        cycleType,
        beginDate
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.resetForm("ruleForm3");
          this.ruleForm3 = {
            signatureType: 1
          };
          this.dialogVisible2 = false;
          this.dialogVisible1 = false;
        } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
        this.init(this.npage, this.pagesize);
      });
    },
    init(pageNumber, pageSize, keywords, startDate, endDate) {
      let _this = this;
      this.loading = true;
      httpGetPeriodicMessage(
        pageNumber,
        pageSize,
        keywords,
        startDate,
        endDate
      ).then(res => {
        // console.log(res);

        let data = res.data;
        if (data.code == 200) {
          _this.tableData = data.data.list;
          _this.total = data.data.total;
        } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          _this.$message.error(data.msg);
        }
        _this.loading = false;
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
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeAvatarUpload(file) {
      //将文件 的所有的内容都添加在这一起上传
      let fd = new FormData();
      fd.append("excel", file);
      // fd.append("realMoney", Number(this.editForm.realMoney)); //其他参数
      // fd.append("withdrawId", Number(this.editForm.withdrawId)); //其他参数
      // fd.append("discountAmt", Number(this.editForm.discountAmt)); //其他参数
      // fd.append("mustPayBackAmt", Number(this.editForm.mustPayBackAmt)); //其他参数
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

      axios.post("/sms/uploadExcel", fd, {}).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
        }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
        this.init(this.npage, this.pagesize);
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
      return isJPG && isLt2M;
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
          this.search.keywords,
          this.search.time[0] + " 00:00:00",
          timeFormat(this.search.time[1], 1)
        );
      } else {
        this.init(this.npage, this.pagesize, this.search.keywords, "", "");
      }
    },
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch(false);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch(false);
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.onSubmit(formName);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交更新修改
    onSubmit(formName) {
      this.hasUser();
      if (formName == "ruleForm3") {
        this._httpSmsPeriodicMessage(
          this.ruleForm3.receiverName,
          this.ruleForm3.messageType,
          this.ruleForm3.sendDate,
          this.ruleForm3.messageContent,
          this.ruleForm3.time[1],
          this.ruleForm3.signatureType,
          this.ruleForm3.mobilePhone,
          sFormat(this.ruleForm3.sendTime),
          this.ruleForm3.remarks,
          this.ruleForm3.now ? 2 : 1,
          this.ruleForm3.time[0]
        );
      }
      // this.resetForm("ruleForm3");
    },
    handleDelete(index, row) {
      this.hasUser();
      let id = row.id;
      let _this = this;
      this.$confirm("此操作将撤销该短信, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this._httpSmsDelete(id);
          this.init(this.npage, this.pagesize);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤销"
          });
        });
    },
    handleEdit(index, row) {
      this.ruleFormData = [];
      let id = row.id;
      this._httpSmsDetails(id);
      this.ruleForm.length = 0;
      this.ruleFormData.push(JSON.parse(JSON.stringify(row)));
      console.log(this.ruleFormData);
      this.url = "";
      this.url = row.url;
      // this.ruleForm = {
      //   receiverName: row.receiverName,
      //   messageType: "",
      //   messageContent: row.messageContent,
      //   time: [row.beginDate, row.endDate],
      //   signatureType: "",
      //   mobilePhone: row.mobilePhone,
      //   sendTime: row.sendTime,
      //   remarks: "",
      //   now: ""
      // };
      // this.dialogVisible2 = true;
    },
    filterStatus(value, row, column) {
      return row.sendStatus == value;
    },
    filterSendPlatform(value, row, column) {
      return row.sendPlatform == value;
    },
    filterMessageType(value, row, column) {
      return row.messageType == value;
    },
    open() {
      window.open(this.url);
    }
  },
  mounted() {
    this.init(this.npage, this.pagesize);
    this._httpFindAllSignature();
  }
};
</script>

<style>
#text .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#rq span {
  width: 45px;
}
</style>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.item strong {
  display: inline-block;

  width: 200px;
}
</style>

