// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** analyzeByCustomer POST /api/chart/analyzeByCustomer */
export async function analyzeByCustomerUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.analyzeByCustomerUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCustomerAnalyzeVO_>('/api/chart/analyzeByCustomer', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** analyzeByPredict POST /api/chart/analyzeByPredict */
export async function analyzeByPredictUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.analyzeByPredictUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListPredictVO_>('/api/chart/analyzeByPredict', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** analyzeByRegion GET /api/chart/analyzeByRegion */
export async function analyzeByRegionUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListRegionMonitorAnalyzeVO_>('/api/chart/analyzeByRegion', {
    method: 'GET',
    ...(options || {}),
  });
}

/** analyzeByStruct POST /api/chart/analyzeByStruct */
export async function analyzeByStructUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.analyzeByStructUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListStructAnalyzeVO_>('/api/chart/analyzeByStruct', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** analyzeByTime POST /api/chart/analyzeByTime */
export async function analyzeByTimeUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.analyzeByTimeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChartVO_>('/api/chart/analyzeByTime', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getAllProvince GET /api/chart/getAllProvince */
export async function getAllProvinceUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListString_>('/api/chart/getAllProvince', {
    method: 'GET',
    ...(options || {}),
  });
}
