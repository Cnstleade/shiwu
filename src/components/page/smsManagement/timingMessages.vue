<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>   
        <el-row class="m20 col-flex-end"  >
                  <div style="flex-grow:1" class="l20">
                    <el-button   icon="el-icon-plus" type="primary" @click="dialogVisible1=true,resetForm" >新增</el-button>

                  </div>
        

                  <el-button  class="l20 " type="danger" @click="download">下载模板</el-button>
      
            <div class="l20">                            
                  <el-upload
                    class="upload-demo flex"
                    ref="upload"
                    action="123"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">上传格式为"txt"或"xsl"文件</div> -->
                  </el-upload>                
            </div>   
               
         
                    <el-button  class="l20" type="primary" style="margin-left:10px" @click="reset">重置</el-button>
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入手机号码"
                          v-model="search.mobilePhone"
                          clearable>
                        </el-input> 
                    </div>
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入关键字"
                          v-model="search.keywords"
                          clearable>
                        </el-input> 
                    </div>
                    <el-select class="l20" v-model="search.sendStatus" placeholder="状态">
                      <el-option
                        v-for="item in sendStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
                    <el-select class="l20" v-model="search.sendPlatform" placeholder="发送平台">
                      <el-option
                        v-for="item in sendPlatform"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>                                                                            
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
            @selection-change="handleSelectionChange"
            id="text"
          >
            <el-table-column
            fixed
              type="selection"
              align="center"
              width="55">
            </el-table-column>        
        
            <el-table-column prop="id" label="序号" align="center" width="70"  sortable></el-table-column>

            <el-table-column prop="senddatetime" label="发送时间" align="center" width="140" >
                <template slot-scope="scope">
                    {{scope.row.senddatetime|dateServer}}
                </template>              
                        
            </el-table-column>
            <el-table-column prop="mobilePhone" label="电话" align="center" width="120" ></el-table-column>
            <!-- <el-table-column prop="recordStatus" label="短信状态" align="center" width="100" 
             :filters="[{ text: '正常', value: '1' }, { text: '更新', value: '2' }, { text: '撤销', value: '3' }]" :filter-method="filterRecordStatus" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.recordStatus ==1?'success':scope.row.recordStatus ==2?'info':'danger'">
                          {{ scope.row.recordStatus ==1?'正常':scope.row.recordStatus ==2?'更新':'撤销' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>             -->
            <el-table-column prop="sendStatus" label="短信状态" align="center" width="100" 
             :filters="[{ text: '发送成功', value: '1' }, { text: '待发送', value: '2' }, { text: '发送失败', value: '3' }, { text: '失败重发中', value: '4' }, { text: '撤销', value: '5' }]" :filter-method="filterStatus" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ==1?'success':scope.row.sendStatus ==2?'info':scope.row.sendStatus ==3?'danger':scope.row.sendStatus ==4?'primay':'warning'">
                          {{ scope.row.sendStatus ==1?'发送成功':scope.row.sendStatus ==2?'待发送':scope.row.sendStatus ==3?'发送失败':scope.row.sendStatus ==4?'失败重发中':'撤销' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>
            <el-table-column prop="reciverName" label="接收人姓名" align="center" width="100" ></el-table-column>
            <!-- <el-table-column prop="senderName" label="创建人" align="center" width="100" ></el-table-column> -->
          <el-table-column prop="messageContent" label="消息内容" align="center" min-width='300' >
                          <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.messageContent" placement="top">
                              <span>{{scope.row.messageContent}}</span>
                          </el-tooltip>
                    </template> 
          </el-table-column>            
            <el-table-column prop="remarks" label="备注" align="center" width='200' >
                         <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.remarks" placement="top">
                              <span>{{scope.row.remarks}}</span>
                          </el-tooltip>
                    </template> 
            </el-table-column>
            <!-- <el-table-column prop="sendPlatform" label="发送平台" align="center"  width="100" 
             :filters="[{ text: '华信', value: '1' }, { text: '创蓝', value: '2' }]" :filter-method="filterSendPlatform" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendPlatform ===1?'success':'danger'">
                          {{ scope.row.sendPlatform ===1?'华信':'创蓝' }}
                        </el-tag>
                    </template> 

            </el-table-column> -->
           <el-table-column prop="signature" label="签名" align="center"  width="100" 
             :filters="[{ text: '恒舜金融', value: '1' }, { text: '恒舜普惠', value: '2' }, { text: '恒舜财富', value: '3' }, { text: '提钱付', value: '4' }]" :filter-method="filterSingnature" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.signature ===1?'success':scope.row.signature ===2?'danger':''">
                          {{ scope.row.signature===1?'恒舜金融':scope.row.signature===2?'恒舜普惠':scope.row.signature===3?'恒舜财富':scope.row.signature===4?'提钱付':'' }}
                        </el-tag>
                    </template> 

            </el-table-column>          
  
            <el-table-column prop="messageType" label="短信类型" align="center" width="100"
             :filters="[{ text: '下款', value: '1' }, { text: '还款', value: '2' }, { text: '还本', value: '3' },{ text: '付息提醒', value: '4' },{ text: '付本提醒', value: '5' },{ text: '其他', value: '6' }]" :filter-method="filterMessageType" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type=" scope.row.messageType ===1?'':scope.row.messageType ===2?'success':scope.row.messageType ===3?'info':scope.row.messageType ===4?'warning':scope.row.messageType ===5?'danger':'' ">
                          {{ scope.row.messageType ===1?'下款':scope.row.messageType ===2?'还款':scope.row.messageType ===3?'还本':scope.row.messageType ===4?'付息提醒':scope.row.messageType ===5?'付本提醒':'其他' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>
            <!-- <el-table-column prop="sendStatus" label="发送状态" align="center" width="100" 
             :filters="[{ text: '已发送', value: '1' }, { text: '未发送', value: '2' }, { text: '发送失败', value: '3' }]" :filter-method="filterStatus" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ==1?'success':scope.row.sendStatus ==2?'info':'danger'">
                          {{ scope.row.sendStatus ==1?'已发送':scope.row.sendStatus ==2?'未发送':'发送失败' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>             -->
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
                    @click="handleEdit(scope.$index, scope.row)"
                   >编辑</el-button>
                <el-button
                    size="mini"
                    :type="scope.row.sendStatus==5?'info':'danger'"
                    :disabled="scope.row.sendStatus==5"
                    @click="handleDelete(scope.$index, scope.row)"
                   >撤销</el-button>                   
                </template> 
            </el-table-column>            
        </el-table>  
       <el-row class="m20" v-if="total>0">
            <el-button type="primary" style="float:left" @click="handelConfigAll" :disabled="multipleSelection.length==0">批量撤销</el-button>
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
              <!-- <el-form-item label="发送时间" >
                <el-input v-model="ruleForm3.username" ></el-input>
              </el-form-item> -->
              <el-form-item label="手机号码" prop='mobile'>
                <el-input v-model="ruleForm3.mobile"></el-input>
              </el-form-item>  
              <el-form-item label="立即发送">
                <el-switch v-model="ruleForm3.now"></el-switch>
              </el-form-item>   
              <el-form-item label="发送时间" v-if="!ruleForm3.now">
                <el-date-picker
                  v-model="ruleForm3.sendTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
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
              <el-form-item label="接收人姓名" prop="reciverName">
                <el-input v-model="ruleForm3.reciverName" ></el-input>
              </el-form-item>  
              <el-form-item label="创建人" prop="senderName">
                <el-input v-model="ruleForm3.senderName" :disabled="true"></el-input>
              </el-form-item>   
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
              <el-form-item label="发送签名" prop="signature">
                    <el-select  v-model="ruleForm3.signature" placeholder="发送签名">
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
              <el-form-item label="发送平台" prop="sendPlatform">
                    <el-select  v-model="ruleForm3.sendPlatform" placeholder="发送平台">
                      <el-option
                        v-for="item in sendPlatform"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>  
              <el-form-item label="消息内容">
                <el-input type="textarea" v-model="ruleForm3.messageContent"></el-input>
              </el-form-item>              
 
              <el-form-item label="备注">
                <el-input type="textarea" v-model="ruleForm3.remarks"></el-input>
              </el-form-item>                                                      
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm3')">提交</el-button>
                  <el-button @click="resetForm('ruleForm3')">重置</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>   
       <el-dialog
          title="编辑短信"
          :visible.sync="dialogVisible2"
          center
          width="35%"
          >
            <el-form :rules="rules" :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" >
              <!-- <el-form-item label="发送时间" >
                <el-input v-model="ruleForm3.username" ></el-input>
              </el-form-item> -->
              <el-form-item label="手机号码" prop='mobilePhone'>
                <el-input v-model="ruleForm2.mobilePhone"></el-input>
              </el-form-item>  
              <el-form-item label="立即发送">
                <el-switch v-model="ruleForm2.now"></el-switch>
              </el-form-item>   
              <el-form-item label="发送时间" v-if="!ruleForm2.now">
                <el-date-picker
                  v-model="ruleForm2.senddatetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>                
              </el-form-item>  
              <!-- <el-form-item label="发送状态" prop="sendStatus" >
                    <el-select  v-model="ruleForm2.sendStatus" placeholder="发送状态">
                      <el-option
                        v-for="item in sendStatus"
                        :key="item.value"
                        
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>                -->
              <el-form-item label="接收人姓名" prop="reciverName">
                <el-input v-model="ruleForm2.reciverName" ></el-input>
              </el-form-item>  
              <el-form-item label="创建人" prop="senderName">
                <el-input v-model="ruleForm2.senderName" :disabled="true"></el-input>
              </el-form-item>   
              <el-form-item label="备注">
                <el-input type="textarea" v-model="ruleForm2.remarks"></el-input>
              </el-form-item>
              <el-form-item label="发送平台" prop="sendPlatform">
                    <el-select  v-model="ruleForm2.sendPlatform" placeholder="发送平台">
                      <el-option
                        v-for="item in sendPlatform"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>  
              <el-form-item label="消息内容">
                <el-input type="textarea" v-model="ruleForm2.messageContent"></el-input>
              </el-form-item>              
              <el-form-item label="短信类型" prop="messageType">
                    <el-select  v-model="ruleForm2.messageType" placeholder="短信类型">
                      <el-option
                        v-for="item in messageType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item> 
              <el-form-item label="发送签名" prop="signature">
                    <el-select  v-model="ruleForm2.signature" placeholder="发送签名">
                      <el-option
                        v-for="item in Sianature"
                        :key="item.id"
                        :label="item.signature"
                        :value="item.id">
                      </el-option> 
                    </el-select> 
              </el-form-item>                                           
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>       
      </el-dialog> 
      <el-dialog
          title="短信详情"
          :visible.sync="dialogVisible3"
          center
          width="58%"
        >
        <!-- <el-row>
            <el-alert
              :title="showTitle"
              :closable="false"
              type="error">
            </el-alert>           
        </el-row>          -->
        <el-row>
          <el-button  icon="el-icon-plus" type="primary" @click="open" >短信来源</el-button>
        </el-row>
        <el-table
            :data="DetailtableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
             highlight-current-row style="width: 100%;font-weight:bold"
            class="m20"
            v-loading="loading"
            @selection-change="handleSelectionChange"
          >
       
        
            <el-table-column prop="id" label="序号" fixed align="center" width="70"  sortable></el-table-column>

            <el-table-column prop="senddatetime" label="发送时间" align="center" width="140" >
                <template slot-scope="scope">
                    {{scope.row.senddatetime|dateServer}}
                </template>              
            </el-table-column>
            <el-table-column prop="mobilePhone" label="电话" align="center" width="120" ></el-table-column>
            <!-- <el-table-column prop="recordStatus" label="短信状态" align="center" width="100" 
             :filters="[{ text: '正常', value: '1' }, { text: '更新', value: '2' }, { text: '撤销', value: '3' }]" :filter-method="filterRecordStatus" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.recordStatus ==1?'success':scope.row.recordStatus ==2?'info':'danger'">
                          {{ scope.row.recordStatus ==1?'正常':scope.row.recordStatus ==2?'更新':'撤销' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>             -->
            <el-table-column prop="sendStatus" label="短信状态" align="center" width="100" 
             :filters="[{ text: '发送成功', value: '1' }, { text: '待发送', value: '2' }, { text: '发送失败', value: '3' }, { text: '失败重发中', value: '4' }, { text: '撤销', value: '5' }]" :filter-method="filterStatus" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ==1?'success':scope.row.sendStatus ==2?'info':scope.row.sendStatus ==3?'danger':scope.row.sendStatus ==4?'primay':'warning'">
                          {{ scope.row.sendStatus ==1?'发送成功':scope.row.sendStatus ==2?'待发送':scope.row.sendStatus ==3?'发送失败':scope.row.sendStatus ==4?'失败重发中':'撤销' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>
            <el-table-column prop="reciverName" label="接收人姓名" align="center" width="100" ></el-table-column>
            <el-table-column prop="senderName" label="创建人" align="center" width="100" ></el-table-column>
          <!-- <el-table-column prop="messageContent" label="消息内容" align="center" width='300'></el-table-column>    -->
          <el-table-column prop="sendTimes" label="发送次数" align="center" width='80'></el-table-column>                    
            <!-- <el-table-column prop="senderName" label="备注" align="center" ></el-table-column> -->
            <el-table-column prop="sendPlatform" label="发送平台" align="center"   
             :filters="[{ text: '华信', value: '1' }, { text: '创蓝', value: '2' }]" :filter-method="filterSendPlatform" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendPlatform ===1?'success':'danger'">
                          {{ scope.row.sendPlatform ===1?'华信':'创蓝' }}
                        </el-tag>
                    </template> 

            </el-table-column>
  
            <el-table-column prop="messageType" label="短信类型" align="center" width="100"
             :filters="[{ text: '下款', value: '1' }, { text: '还款', value: '2' }, { text: '还本', value: '3' },{ text: '付息提醒', value: '4' },{ text: '付本提醒', value: '5' },{ text: '其他', value: '6' }]" :filter-method="filterMessageType" filter-placement="bottom-end"
                    >
  
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type=" scope.row.messageType ===1?'':scope.row.messageType ===2?'success':scope.row.messageType ===3?'info':scope.row.messageType ===4?'warning':scope.row.messageType ===5?'danger':'' ">
                          {{ scope.row.messageType ===1?'下款':scope.row.messageType ===2?'还款':scope.row.messageType ===3?'还本':scope.row.messageType ===4?'付息提醒':scope.row.messageType ===5?'付本提醒':'其他' }}
                        </el-tag>
                    </template>                     
              
            </el-table-column>
            <!-- <el-table-column prop="sendStatus" label="发送状态" align="center" width="100" 
             :filters="[{ text: '发送成功', value: '1' }, { text: '待发送', value: '2' }, { text: '发送失败', value: '3' }, { text: '失败重发中', value: '4' }, { text: '撤销', value: '5' }]" :filter-method="filterStatus" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ==1?'success':scope.row.sendStatus ==2?'info':scope.row.sendStatus ==3?'danger':scope.row.sendStatus ==4?'primay':'warning'">
                          {{ scope.row.sendStatus ==1?'发送成功':scope.row.sendStatus ==2?'待发送':scope.row.sendStatus ==3?'发送失败':scope.row.sendStatus ==4?'失败重发中':'撤销' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>               -->
            <!-- <el-table-column prop="cz"  align="center" label="操作" width="240"  >
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="success"
                    @click="handleShow(scope.$index, scope.row)"
                   >详情</el-button>                  
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                   >编辑</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                   >撤销</el-button>                   
                </template> 
            </el-table-column>             -->
        </el-table>  
            <el-card shadow="hover" class="m20" v-if="DetailtableData[0]">
                 <strong style="display:inline-block;width:80px;margin-right:20px">消息内容:</strong> <i>{{DetailtableData[0].messageContent}}</i> 
            </el-card> 
            <el-card shadow="hover" class="m20" v-if="DetailtableData[0]">
                 <strong style="display:inline-block;width:80px;margin-right:20px">备注:</strong><i>{{DetailtableData[0].remarks}}</i> 
            </el-card>               
            <!-- <el-card shadow="hover" class="m20">
                 <strong style="margin-right:20px">备注:</strong> {{DetailtableData[0].messageContent}}
            </el-card>                     -->
        <el-table
            :data="showData"  
            border  
             highlight-current-row style="width: 100%;font-weight:bold"
            class="m20"
          >
               <el-table-column
                fixed
      type="index"
      label="序号"
      width="100">
    </el-table-column>          
            <el-table-column prop="sendstatus" label="发送状态" align="center"
             :filters="[{ text: '成功', value: '1' }, { text: '失败', value: '2' }]" :filter-method="filterSendstatus" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendstatus ===1?'success':'danger'">
                          {{ scope.row.sendstatus ===1?'成功':'失败' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>           
            <el-table-column prop="sendTime" label="发送时间" align="center"  >
              <template slot-scope="scope">
                <template v-if="scope.row.sendTime">
                    {{scope.row.sendTime|dateServer}}
                </template>
                </template>                  
            </el-table-column>            
            <!-- <el-table-column prop="type" label="短信类型" align="center" width="100"
             :filters="[{ text: '周期短信', value: '1' }, { text: '定时短信', value: '2' }]" :filter-method="filterType" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.type ===1?'success':'danger'">
                          {{ scope.row.type ===1?'周期短信':'定时短信' }}
                        </el-tag>
                    </template> 
              
            </el-table-column>           -->
            <!-- <el-table-column prop="sendPlatform" label="发送平台" align="center"  
             :filters="[{ text: '华信', value: '1' }, { text: '创蓝', value: '2' }]" :filter-method="filterSendPlatform" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ===1?'success':'danger'">
                          {{ scope.row.sendPlatform ===1?'华信':'创蓝' }}
                        </el-tag>
                    </template> 

            </el-table-column>          -->
        </el-table>
       <el-row class="m20" v-if="showTotal>0">
            <!-- <el-button type="primary" style="float:left" @click="handelConfigAll" :disabled="multipleSelection.length==0">批量删除</el-button> -->
             <div style="float:right">
                 <el-pagination
                   @current-change="handleCurrentChangeS"
                    @size-change="handleSizeChangeS"
                   :current-page="showNpage"
                    :page-sizes="[10, 20, 30, 40]"
                     :page-size="pagesize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="showTotal">
                 </el-pagination>   
             </div>
        </el-row>         
      </el-dialog>                                            
    </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import { timeFormat } from "../../../config/time";
import {
  httpSelectTable,
  httpUpdateMessageAll,
  httpApmsgDeleteData,
  httpFindMessageRecording,
  httpFindAllSignature,
  httpDownload,
  httpGetSianature,
} from "../../../service/http";
export default {
  computed: {
    username() {
      let username = sessionStorage.getItem("hsjr_username");
      if (username != "" && username != null && username != "undefined") {
        this.name = username ? username : "";
        return username ? username : "";
      } else {
        this.$router.push("/login");
      }
    },
    ...mapState(["userInfo"])
  },
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
      Sianature: [],
      name: "",
      url: "",
      signatureType: [
        { label: "恒舜金融", value: 1 },
        { label: "恒舜普惠", value: 2 },
        { label: "恒舜财富", value: 3 }
      ],
      DetailtableData: [],
      title: "定时短信",
      multipleSelection: [],
      search: {
        time: [],
        keywords: ""
      },
      sendStatus: [
        { label: "发送成功", value: 1 },
        { label: "待发送", value: 2 },
        { label: "发送失败", value: 3 },
        { label: "失败重发中", value: 4 },
        { label: "撤销", value: 5 }
      ],
      sendPlatform: [{ label: "华信", value: 1 }, { label: "创蓝", value: 2 }],
      messageType: [
        { label: "下款", value: 1 },
        { label: "还款", value: 2 },
        { label: "还本", value: 3 },
        { label: "付息提醒", value: 4 },
        { label: "付本提醒", value: 5 },
        { label: "其他", value: 6 }
      ],
      dialogVisible1: false,
      dialogVisible3: false,
      showData: [],
      currentId: "",
      showNpage: 0,
      showPageSize: 10,
      showTotal: 0,
      showTitle: "",
      fileList: [],
      tableData: [],
      loading: false,
      npage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible2: false,
      ruleForm3: {
        now: false,
        sendPlatform: 1,
        senderName: this._getName(),
        signature: 1
      },
      ruleForm2: {},
      rules: {
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        reciverName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        senderName: [{ message: "请输入真实姓名", trigger: "blur" }],
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
        mobile: [{ require: true, validator: validateMobile, trigger: "blur" }],
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
        ]
      }
    };
  },
  methods: {
    _httpFindAllSignature() {
      httpGetSianature().then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.Sianature = data.data;
        }else if(data.code == 1000){
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
    _getName() {
      let username = sessionStorage.getItem("hsjr_username");
      if (username != "" && username != null && username != "undefined") {
        return username ? username : "";
      } else {
        this.$router.push("/login");
      }
    },
    // _httpFindAllSignature() {
    //   httpFindAllSignature().then(res => {
    //     console.log(res);
    //   });
    // },
    //得到短信详情
    _httpFindMessageRecording(id) {
      this.dialogVisible3 = false;
      httpFindMessageRecording(this.showNpage, this.showPageSize, id).then(
        res => {
          let data = res.data;
          this.showTotal = data.data.total;
          this.showData = data.data.rows;
          this.dialogVisible3 = true;
        }
      );
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
    //新增修改用户
    _httpUpdateMessageAll(
      Id,
      senddatetime,
      mobilePhone,
      sendTime,
      sendStatus,
      reciverName,
      senderName,
      sendDate,
      remarks,
      sendPlatform,
      messageContent,
      messageType,
      signature
    ) {
      if (
        senddatetime == null ||
        senddatetime == undefined ||
        senddatetime == ""
      ) {
        this.$message.error("请选择发送时间");
        return;
      }
      this.hasUser();
      httpUpdateMessageAll(
        Id,
        senddatetime,
        mobilePhone,
        sendTime,
        sendStatus,
        reciverName,
        senderName,
        sendDate,
        remarks,
        sendPlatform,
        messageContent,
        messageType,
        signature
      ).then(res => {
        let data = res.data;
        if (data.status) {
          this.$message({
            message: data.messager,
            type: "success"
          });
          this.dialogVisible2 = false;
          this.dialogVisible1 = false;
          this.init(this.npage, this.pagesize);
        } else {
          this.$message.error(data.messager);
          this.$router.push("/login");
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
    init(
      pageNumber,
      pageSize,
      mobilePhone,
      sendStatus,
      messageContent,
      sendPlatform
    ) {
      this.hasUser();
      let _this = this;
      this.loading = true;
      httpSelectTable(
        pageNumber,
        pageSize,
        mobilePhone,
        sendStatus,
        messageContent,
        sendPlatform
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          _this.tableData = data.data.rows;
          _this.total = data.data.total;

          _this.loading = false;
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
      //   .catch(err => {
      //     let data = err.response ? err.response.data : {};

      //     if (data.message == "当前登陆用户已失效，请重新登陆") {
      //       this.$message.error(data.message);
      //  //     this.$router.push("/login");
      //     } else {
      //       this.$message.error("网络错误请联系管理员");
      //     }
      //     _this.loading = false;
      //   });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    beforeAvatarUpload(file) {
      //将文件 的所有的内容都添加在这一起上传
      let fd = new FormData();
      fd.append("upload", file);
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
      console.log(file);
      var re = /\w+\.(txt|xlsx)/;
      const isJPG = re.test(file.name);
      console.log(isJPG);
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
      this.$message({
        message: "申请提交成功等待审核",
        type: "success"
      });
      axios
        .post("/readExcel", fd, {})
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
          } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error("上传文件有误请先下载模板");
          }
          this.init(this.npage, this.pagesize);
        })
        .catch(err => {
          this.$message.error("上传文件有误请先下载模板");
        });
      return isJPG && isLt2M;
    },
    reset() {
      this.search = {};
      this.npage = 1;
      this.pagesize = 10;
      this.init(this.npage, this.pagesize);
    },
    handleSearch() {
      this.init(
        this.npage,
        this.pagesize,
        this.search.mobilePhone,
        this.search.sendStatus,
        this.search.keywords,
        this.search.sendPlatform
      );
    },
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },
    handleCurrentChangeS(val) {
      this.showNpage = val;
      this._httpFindMessageRecording(this.currentId);
    },
    handleSizeChangeS(val) {
      this.showPageSize = val;
      this._httpFindMessageRecording(this.currentId);
    },
    //提交更新修改
    onSubmit(formName) {
      this.hasUser();
      if (formName == "ruleForm3") {
        if (this.ruleForm3.now) {
          this._httpUpdateMessageAll(
            null,
            timeFormat(new Date()),
            this.ruleForm3.mobile,
            null,
            this.ruleForm3.status,
            this.ruleForm3.reciverName,
            this.ruleForm3.senderName,
            null,
            this.ruleForm3.remarks,
            this.ruleForm3.sendPlatform,
            this.ruleForm3.messageContent,
            this.ruleForm3.messageType,
            this.ruleForm3.signature
          );
        } else {
          this._httpUpdateMessageAll(
            null,
            this.ruleForm3.sendTime,
            this.ruleForm3.mobile,
            null,
            this.ruleForm3.status,
            this.ruleForm3.reciverName,
            this.ruleForm3.senderName,
            null,
            this.ruleForm3.remarks,
            this.ruleForm3.sendPlatform,
            this.ruleForm3.messageContent,
            this.ruleForm3.messageType,
            this.ruleForm3.signature
          );
        }
      } else {
        if (this.ruleForm2.now) {
          this._httpUpdateMessageAll(
            this.ruleForm2.id,
            timeFormat(new Date()),
            this.ruleForm2.mobilePhone,
            null,
            null,
            this.ruleForm2.reciverName,
            this.ruleForm2.senderName,
            null,
            this.ruleForm2.remarks,
            this.ruleForm2.sendPlatform,
            this.ruleForm2.messageContent,
            this.ruleForm2.messageType,
            this.ruleForm2.signature
          );
        } else {
          this._httpUpdateMessageAll(
            this.ruleForm2.id,
            this.ruleForm2.senddatetime,
            this.ruleForm2.mobilePhone,
            null,
            null,
            this.ruleForm2.reciverName,
            this.ruleForm2.senderName,
            null,
            this.ruleForm2.remarks,
            this.ruleForm2.sendPlatform,
            this.ruleForm2.messageContent,
            this.ruleForm2.messageType,
            this.ruleForm2.signature
          );
        }
      }
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
      this.ruleForm3 = {
        now: false,
        sendPlatform: 1,
        senderName: "admin",
        signature: 1
      };
    },
    handleEdit(index, row) {
      let id = row.id;
      let _this = this;

      this.ruleForm2 = Object.assign({}, row, { now: false });
      this.dialogVisible2 = true;
    },
    handleDelete(index, row) {
      let id = row.id;
      let _this = this;
      this.$confirm("此操作将永久撤销该短信, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this._httpApmsgDeleteData(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _httpApmsgDeleteData(ids) {
      let _this = this;
      httpApmsgDeleteData(ids).then(res => {
        let data = res.data;
        if (data.status) {
          _this.$message({
            message: data.messager,
            type: "success"
          });
        } else {
          _this.$message.error(data.messager);
          _this.$router.push("/login");
        }
        _this.init(this.npage, this.pagesize);
      });
      // .catch(err => {
      //   let data = err.response ? err.response.data : {};

      //   if (data.message == "当前登陆用户已失效，请重新登陆") {
      //     this.$message.error(data.message);
      //  //   this.$router.push("/login");
      //   } else {
      //     this.$message.error("网络错误请联系管理员");
      //   }
      // });
    },
    //批量选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handelConfigAll() {
      let ids = [];
      let _this = this;
      for (let a = 0; a < this.multipleSelection.length; a++) {
        ids.push(this.multipleSelection[a].id);
      }
      this.$confirm("此操作将永久撤销该短信, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this._httpApmsgDeleteData(ids.join(","));
          _this.init(this.npage, this.pagesize);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤销"
          });
        });
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
    filterType(value, row, column) {
      return row.Type == value;
    },
    filterSendstatus(value, row, column) {
      return row.sendstatus == value;
    },
    filterRecordStatus(value, row, column) {
      return row.recordStatus == value;
    },
    filterSingnature(value, row, column) {
      return row.signature == value;
    },
    //download
    download() {
      window.open(
        "http://paxfivrd0.bkt.clouddn.com/EXCEL20180831180148754.xls"
      );
    },
    handleShow(index, row) {
      this.currentId = "";
      this.showTitle = "";
      this.url = "";
      let id = row.id;
      this.currentId = id;
      this.url = row.url;
      this.DetailtableData.length = 0;
      this.DetailtableData.push(JSON.parse(JSON.stringify(row)));
      // this.url = "https://www.baidu.com/?tn=02003390_2_hao_pg";
      this.showTitle = row.messageContent;
      this._httpFindMessageRecording(id);
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
</style>
