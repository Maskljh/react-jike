import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { getChannelAPI, createArticleAPI, getArticleInfoAPI,  changeArticleAPI } from "@/apis/channel";
import { useEffect, useState } from "react";

import { useChannel } from "../../hooks/useChannel";
import { useSearchParams } from "react-router-dom";
const { Option } = Select;

const Publish = () => {
  // const [channel, setChannle] = useState([]);
  // const getChannelList = async () => {
  //   const res = await getChannelAPI();
  //   console.log(res.data.channels);
  //   setChannle(res.data.channels);
  // };
  // useEffect(() => {
  //   getChannelList();
  // }, []);
  const channel = useChannel();
  // console.log(channel)

  // 获得表单文件并发送
  const onFinish = (values) => {
    // console.log(channel[values.channel_id])
    if (imageList.length !== radioType) {
      return message.warning("照片数量不符合");
    }
    const reqData = {
      ...values,
      cover: {
        type: radioType,
        images: imageList.map((item) =>{
          if(item.response)
            return item.response.data.url
          else
            return item.url
        })
      }
    };
    if(articleId){
      changeArticleAPI({...reqData,id:articleId})
    }
    else{
      console.log(reqData)
      createArticleAPI(reqData);
    }
    // 清空表单
    form.resetFields();
    setRadioType(0);
    message.success("发表成功")
  };

  //upload改变事件
  const [imageList, setImageList] = useState([]);
  const onChange = (values) => {
    console.log(values);
    // console.log(values.fileList.response);
    setImageList(values.fileList);
  };

  const [radioType, setRadioType] = useState(0);
  // 单选框点击事件
  const onTypeChange = (e) => {
    console.log(e.target.value);
    setRadioType(e.target.value);
    setImageList([]);
    console.log(imageList);
  };

  const [form] = Form.useForm();

  // 跳转获取参数
  const [searchParams]=useSearchParams()
  const articleId=searchParams.get('id')
  console.log(articleId)

  useEffect(()=>{
    async function getInfo(){
      const res= await getArticleInfoAPI(articleId)
      console.log(res)
      form.setFieldsValue({
        ...res.data,
        type:res.data.cover.type
      })
      setRadioType(res.data.cover.type)
      setImageList(res.data.cover.images.map(url=>{
        return {url}
      }))
    }
    if(articleId)
      getInfo()
  },[articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: articleId?"编辑文章":"发布文章" },
            ]}
          />
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* <Option value={0}>推荐</Option> */}
              {channel.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {radioType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                onChange={onChange}
                maxCount={radioType}
                multiple={radioType > 1}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
