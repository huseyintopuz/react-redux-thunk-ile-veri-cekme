import './App.css';
import { connect } from 'react-redux';
import { getCountries } from './actions/index'
import { useEffect } from 'react';
import { Menu, Dropdown, Button, Space } from 'antd';
import { SyncOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'

function App(props) {
  const menu = (
    <Menu className='space'>
      <Menu.Item>
        {props.countries.map((country, index) => {
          return (
            <div key={index}>
              <h2>{country.name.common}</h2>
              <p>{country.capital}</p>
              <img
                alt={country.name}
                src={country.flags.png}
                style={{ width: '100px', marginBottom: '1rem' }}
              />
            </div>
          )
        })}
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    props.getCountries()
  }, [])

  console.log(props.countries)
  return (
    <div className="App">
      <h2>Redux Thunk MiddleWare</h2>
      {props.isLoading ? <SyncOutlined spin /> : 
        (
          <Space direction="vertical">
            <Space wrap>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>Countries</Button>
              </Dropdown>
            </Space>
          </Space>
        )
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    countries: state.countries,
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, { getCountries })(App);
