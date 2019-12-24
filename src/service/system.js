/**
 * @author wf
 * @date 2019/11/30
 */
import { call } from '../utils/call'
export default class System {
  static getPayrollList = ({ Filter }) => {
    return call({
      method: 'GET',
      url: `/ReservationOpenUri/getReservationList`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        custNo: '81501210120142001406',
        page: Filter.page,
        limit: Filter.limit,
        startDate: Filter.startDate,
        endDate: Filter.endDate
      }
    })
  }
  static addPayrollList = ({ Filter }) => {
    return new Promise((resolve, reject) => {
      resolve(call({
        method: 'PUT',
        url: `/ReservationOpenUri/addReservation`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: Filter
      }).then(res => {
        return Promise.resolve(res.data)
      }).catch(err => {
        console.log(err)
        return Promise.resolve({
          'retCode': '1',
          'retMsg': '网络异常',
          'data': 'first_login:1'
        })
      }))
    })
  }
  static getPayrollDetail = ({ seqNo }) => {
    return call({
      method: 'GET',
      url: `/ReservationOpenUri/getReservation`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        seqNo: seqNo
      }
    })
  }
  static editPayrollDetail = ({ Filter }) => {
    return new Promise((resolve, reject) => {
      resolve(call({
        method: 'POST',
        url: `/ReservationOpenUri/editReservation`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: Filter
      }).then(res => {
        return Promise.resolve(res.data)
      }).catch(err => {
        console.log(err)
        return Promise.resolve({
          'retCode': '1',
          'retMsg': '网络异常',
          'data': 'first_login:1'
        })
      }))
    })
  }
  static evaluateReservation = ({ Filter }) => {
    return new Promise((resolve, reject) => {
      resolve(call({
        method: 'POST',
        url: `/ReservationOpenUri/evaluateReservation`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: Filter
      }).then(res => {
        return Promise.resolve(res.data)
      }).catch(err => {
        console.log(err)
        return Promise.resolve({
          'retCode': '1',
          'retMsg': '网络异常',
          'data': 'first_login:1'
        })
      }))
    })
  }
  static cancelPayrollDetail = ({ seqNo }) => {
    return call({
      method: 'GET',
      url: `/ReservationOpenUri/cancelReservation`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        seqNo: seqNo
      }
    })
  }
}
