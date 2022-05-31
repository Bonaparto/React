import React, { useState } from 'react';
import './App.css';
import { Button, Form, Input, Cascader } from 'antd'

function App() {

  const [isFormActive, setFormState] = useState(false);

  const [form] = Form.useForm()
  
  const changeFormState = () => {
    setFormState(!isFormActive)
  }

  const validationMessages = {
    "required": "Please enter your ${label}",
    "string": {
      "min": "${label} must be at least ${min} characters",
      "max": "${label} cannot be longer than ${max} characters"
    },
    "number": {
      "min": "${label} cannot be less than ${min}.",
      "max": "${label} cannot be larger than ${max}."
    }
  }

  const residences = [
    {
      "value": "SKO",
      "label": "SKO",
      "children": [
        {
          "value": "Pavlodar",
          "label": "Pavlodar"
        },
        {
          "value": "Petropavlovsk",
          "label": "Petropavlovsk"
        }
      ]
    },
    {
      "value": "VKO",
      "label": "VKO",
      "children": [
        {
          "value": "Semei",
          "label": "Semei",
          "children": [
            {
              "value": "Test",
              "label": "Test"
            }
          ]
        },
        {
          "value": "Ridder",
          "label": "Ridder"
        }
      ]
    }
  ]

  const successHandler = (data: Object) => {
    const keys = Object.keys(data);
    const value = Object.values(data); 
    Object.keys(keys).forEach((key: string, index: number) => console.log(`${key}: ${value[index]}`))
  }

  const formData = [
    {
      "label": "First Name",
      "name": "fname",
      "placeholder": "Raiymbek",
      "validateFirst": false,
      "rules": [
        {
          required: true,
          min: 3,
        }, 
        {
          max: 10
        }
      ]
    },
    {
      "label": "Second Name",
      "name": "sname",
      "placeholder": "Baktybayev",
      "rules": [
        {
          required: true,
          validator: (_: Object, value: string) => {
            if (/^[a-zA-Z]+$/.test(value)) return Promise.resolve()
            return Promise.reject(new Error("Please enter correct second name"))
          }
        }
      ]
    },
    {
      "label": "Email",
      "name": "email",
      "tooltip": "Enter you email",
      "rules": [
        {
          "required": true, 
        }
      ]
    },
    {
      "label": "Salary",
      "name": "salary"
    }
    
  ]

  return (
    <div className="App">
      <div className="button-container">
      <Button 
        className="button"
        onClick={changeFormState}
        disabled={isFormActive}
      >Open Form
      </Button>
      </div>
      {isFormActive && 
        <div className="form-container">
          <button 
            className="close-btn"
            type="button"
            onClick={changeFormState}
          />
          <Form 
            className="form"
            form={form}
            validateMessages={validationMessages}
            onFinish={successHandler}
            layout="vertical"
          >
            {formData.map((item, index) => 
                <Form.Item
                  className="form-item"
                  key={index}
                  label={item.label}
                  name={item.name}
                  rules={item.rules}
                  tooltip={item.tooltip}
                  hasFeedback
                >
                  <Input placeholder={item.placeholder}/>
                </Form.Item>
              )
            }
            <Form.Item
              label="Residence"
              name="residence"
            >
              <Cascader options={residences}/>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >Submit</Button>
          </Form>
        </div>
      } 
    </div>
  );
}

export default App;
