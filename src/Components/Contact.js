import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";
import emailjs from '@emailjs/browser'; // EmailJS 라이브러리 임포트

class Contact extends Component {
  constructor(props) {
    super(props);
    // 폼 입력 상태와 메시지 상태를 관리합니다.
    this.state = {
      contactName: '',
      contactEmail: '',
      contactSubject: '',
      contactMessage: '',
      messageStatus: '' // 'loading', 'success', 'error' 중 하나
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 폼 입력 필드가 변경될 때 상태를 업데이트합니다.
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // 폼 제출 핸들러 함수
  handleSubmit(e) {
    e.preventDefault(); // 폼의 기본 제출 동작 방지
    
    // 로딩 상태로 변경
    this.setState({ messageStatus: 'loading' }); 

    // EmailJS 키입력
    const SERVICE_ID = 'service_8z401a8'; 
    const TEMPLATE_ID = 'template_al4vi0k'; 
    const USER_ID = '1ReMNJDZ4iWRoSOYO'; 
    
    // 폼 데이터를 EmailJS 템플릿에 전달할 파라미터 객체로 구성
    // 키 이름 (예: from_name)은 EmailJS 템플릿의 변수명({{from_name}})과 일치해야 합니다.
    const templateParams = {
        from_name: this.state.contactName, 
        from_email: this.state.contactEmail,
        subject: this.state.contactSubject,
        message: this.state.contactMessage,
        to_email: 'iys4906@gmail.com' // 실제로 메일을 받을 주소
    };

    console.log('메일 전송 ::::' , templateParams)

    // EmailJS API 호출
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then((response) => {
        // 전송 성공 시
        this.setState({ 
            messageStatus: 'success',
            // 폼 필드 초기화
            contactName: '',
            contactEmail: '',
            contactSubject: '',
            contactMessage: '',
        });
        console.log('메일 전송 성공:', response.status, response.text);
        this.setState({ messageStatus: 'success' });
      })
      .catch((err) => {
        // 전송 실패 시
        this.setState({ messageStatus: 'error' });
        console.error('메일 전송 실패:', err);
      });
  }

  // 메시지 상태에 따라 경고/성공 메시지를 렌더링하는 함수
  renderMessage() {
    const { messageStatus } = this.state;
    if (messageStatus === 'success') {
        return (
            <div id="message-success" style={{ display: 'block' }}>
                <i className="fa fa-check"></i>Your message was sent, thank thank you!
                <br />
            </div>
        );
    } else if (messageStatus === 'error') {
        // 실패 시 console.error에 출력된 상세 오류를 확인해야 합니다.
        return (
            <div id="message-warning" style={{ display: 'block' }}> 
                Error! Please check console for details.
            </div>
        );
    }
    // 기본 상태 (숨김)
    return (
        <>
            <div id="message-warning" style={{ display: 'none' }}> Error boy</div>
            <div id="message-success" style={{ display: 'none' }}>
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
            </div>
        </>
    );
  };


  render() {
    if (!this.props.data) return null;

    // 데이터 props
    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const email = this.props.data.email;
    const phone = this.props.data.phone;
    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">
              {/* 폼 제출 시 handleSubmit 호출 */}
              <form id="contactForm" name="contactForm" onSubmit={this.handleSubmit}>
                <fieldset>
                  
                  {/* Name 필드 */}
                  <div>
                    <label htmlFor="contactName">Name <span className="required">*</span></label>
                    <input
                      type="text"
                      value={this.state.contactName} // 상태와 연결
                      size="35"
                      id="contactName"
                      name="contactName" 
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  
                  {/* Email 필드 */}
                  <div>
                    <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                    <input
                      type="email" 
                      value={this.state.contactEmail}
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  {/* Subject 필드 */}
                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      type="text"
                      value={this.state.contactSubject}
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      onChange={this.handleChange}
                    />
                  </div>

                  {/* Message 필드 */}
                  <div>
                    <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                    <textarea
                      cols="50"
                      rows="15"
                      value={this.state.contactMessage}
                      id="contactMessage"
                      name="contactMessage"
                      onChange={this.handleChange}
                      required
                    ></textarea>
                  </div>

                  <div>
                    {/* 버튼 타입은 submit, 로딩 상태에 따라 버튼 비활성화 및 텍스트 변경 */}
                    <button 
                        className="submit" 
                        type="submit" 
                        disabled={this.state.messageStatus === 'loading'}
                    >
                        {this.state.messageStatus === 'loading' ? 'Sending...' : 'Submit'}
                    </button>
                    {/* 로딩 이미지 */}
                    <span id="image-loader" style={{ display: this.state.messageStatus === 'loading' ? 'inline' : 'none' }}>
                      <img alt="Loading" src="images/loader.gif" />
                    </span>
                  </div>
                </fieldset>
              </form>

              {/* 동적으로 경고/성공 메시지 표시 */}
              {this.renderMessage()}
              
            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Name & Address</h4>
                <p className="address">
                  {name}
                  <br />
                  {street} 
                  <br />
                  {city}
                  <br />
                  <h4>Email & Phone</h4>
                  <span>이메일 : {email}</span>
                  <br />
                  <span>연락처 : {phone}</span>
                </p>
              </div>
            </aside>
          </Slide>
        </div>
      </section>
    );
  }
}

export default Contact;