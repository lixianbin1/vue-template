/*
 * @Author: ranxiaoqian
 * @Date: 2025/4/25 14:15:25
 * @LastEditors: 徐建明
 * @LastEditTime: 2025/7/14 13:42:20
 * @FilePath: \src\utils\format.js
 * @Description:
 */
import dayjs from 'dayjs'
/**
 * 将给定的金额格式化为带有千位分隔符和小数点后两位的字符串。
 * @param amount 需要格式化的金额
 * @param len 格式化金额小数位长度
 * @returns 格式化后的金额字符串
 */
export function formatAmount(amount, len = 2) {
	if (typeof amount === 'number' || typeof amount === 'string') {
		amount = amount.toString()
	} else {
		amount = '0'
	}
	if (amount === '') return ''
	let isNegative = false
	if (amount.includes('-')) {
		amount = amount.slice(1)
		isNegative = true
	}

	// 检查输入是否为有效金额和有效小数位数，已格式化（带有千分位）的不予处理
	if (!/^\d{1,}(\.\d{0,})?$/.test(amount) || len < 0) {
		return `${isNegative ? '-' : ''}${amount}`
	}

	try {
		const intPartFormat = Number(amount.split('.')[0]).toString() || '0'
		const decimalPart = amount.split('.')[1] || ''
		const lastDecimal = decimalPart.length < len ? decimalPart.padEnd(len, '0') : decimalPart.slice(0, len)

		// 添加千分位分隔符
		let formattedIntPart = intPartFormat.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

		// 合并整数部分和小数部分
		const formattedNumber = `${isNegative ? '-' : ''}${formattedIntPart}${len ? '.' : ''}${lastDecimal}`

		return formattedNumber
	} catch (error) {
		console.error(error)
		return ''
	}
}

/**
 * 去格式化金额：去千分位
 * @param amount
 * @returns
 */
export const formatAmountR = function (amount) {
	if (typeof amount === 'number') {
		amount = amount.toString()
	}
	return String(amount.replace(/[^\d\-.]/g, ''))
}

/**
 * 日期格式化
 * @param {*} date 日期格式 Date对象，string日期
 * @param {*} formatStr
 * @param {*} suffix
 * @returns
 */
export function formatDate(date, formatStr = 'YYYY-MM-DD HH:mm:ss', suffix = '') {
	if (!date) return ''
	if (typeof date === 'string') {
		date = date.replace(/-/g, '/')
	}
	let formatDateStr = dayjs(date).format(formatStr)
	if (suffix) formatDateStr = `${formatDateStr}${suffix}`
	return formatDateStr
}

// XXX XXXXXX XXX
export function formatBankCardNo(cardNub) {
	if (!cardNub) return ''
	const toSrtCardNub = String(cardNub)
	const regex = /(\d{3})(\d{6})(\d{3})/g
	return toSrtCardNub.replace(regex, '$1 $2 $3')
}

export function formatCardNo(nub) {
	if (!nub) return ''
	return nub.replace(/^(.{7})(.*)(.{6})$/g, '$1..$3')
}

/**
 * 根据日期获取周几
 * @param value
 * @param newValue 星期日是为0 手动改为7
 * @returns
 */
export function getWeekly(value) {
	let newValue = new Date(value).getDay() || 7
	return newValue
}

/**
 * 获取路由传参
 * @param path [string] 路由路径参数
 * @returns 参数对象
 */
export const getRouteParams = () => {
	const search = window.location.search || window.location.hash.split('?')[1] || ''
	const params = new URLSearchParams(search)
	const result = {}
	for (const [key, value] of params.entries()) {
		result[key] = value
	}
	return result
}

/**
 * 获取发行Coin状态映射表
 *
 * @returns 返回一个对象，包含硬币状态代码及其对应的中文描述
 */
export function getCoinStatusMap() {
	return { 0: 'PENDING', 1: 'COMPLETED', 2: 'FAILED', 3: 'UNKNOWN' }
}

const mouthMap = new Map([
	['01', 'Jan'],
	['02', 'Feb'],
	['03', 'Mar'],
	['04', 'Apr'],
	['05', 'May'],
	['06', 'Jun'],
	['07', 'Jul'],
	['08', 'Aug'],
	['09', 'Sep'],
	['10', 'Oct'],
	['11', 'Nov'],
])

export function formatRefreshTime() {
	const dateObj = new Date()
	const year = dateObj.getFullYear()
	const mouth = (dateObj.getMonth() + 1).toString().padStart(2, '0')
	const day = dateObj.getDate().toString().padStart(2, '0')
	const hours = dateObj.getHours().toString().padStart(2, '0')
	const minutes = dateObj.getMinutes().toString().padStart(2, '0')
	const ampm = hours >= 12 ? 'pm' : 'am'
	const strTime = hours + ':' + minutes + ' ' + ampm + ' on ' + day + ' ' + mouthMap.get(mouth) + ' ' + year + '(HKT)'
	return strTime
}

// 乘法精度缺失处理
export function accMul(amount1, amount2) {
	// 去格式化
	const num1 = formatAmountR(amount1 ?? 0)
	const num2 = formatAmountR(amount2 ?? 0)

	// 解析小数位数
	const decimalLen1 = (num1.split('.')[1] || '').length
	const decimalLen2 = (num2.split('.')[1] || '').length

	// 转换为整数
	const intNum1 = Number(num1.replace('.', ''))
	const intNum2 = Number(num2.replace('.', ''))

	// 计算乘积并调整小数位
	const result = (intNum1 * intNum2) / Math.pow(10, decimalLen1 + decimalLen2)

	// 新增四舍五入并格式化为两位小数
	const roundedResult = result.toFixed(2)
	const [intPart, decimalPart] = roundedResult.split('.')

	// 格式化为带千分位的字符串
	return `${intPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${decimalPart.padEnd(2, '0')}`
}

/**
 * 交易状态转换
 */
export const setStatusMap = (value) => {
	const statusMap = {
		C: 'Complete',
		F: 'Failed',
		P: 'Waiting',
		R: 'Reject',
		A: 'Pending',
	}
	return statusMap[value] || value
}
