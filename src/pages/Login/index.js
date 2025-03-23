import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { fecthLoginForm } from "../../store/modules/user";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const onFinish = async (values) => {
    await dispatch(fecthLoginForm(values))
    navigate('/')
    message.success('登录成功')
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish}>
          <Form.Item
            // label="手机号"
            name="mobile"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "请输入手机号!",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码格式不对",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            // label="验证码"
            name="code"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "请输入验证码!",
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
