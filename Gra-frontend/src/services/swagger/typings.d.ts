declare namespace API {
  type analyzeByCustomerUsingPOSTParams = {
    /** salesChannel */
    salesChannel?: string;
  };

  type analyzeByPredictUsingPOSTParams = {
    /** brand */
    brand?: string;
  };

  type analyzeByROIUsingPOSTParams = {
    /** brand */
    brand?: string;
  };

  type analyzeByStructUsingPOSTParams = {
    /** brand */
    brand?: string;
  };

  type analyzeByTimeUsingPOSTParams = {
    /** time */
    time?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListChartVO_ = {
    code?: number;
    data?: ChartVO[];
    message?: string;
  };

  type BaseResponseListCustomerAnalyzeVO_ = {
    code?: number;
    data?: CustomerAnalyzeVO[];
    message?: string;
  };

  type BaseResponseListPredictVO_ = {
    code?: number;
    data?: PredictVO[];
    message?: string;
  };

  type BaseResponseListProducts_ = {
    code?: number;
    data?: Products[];
    message?: string;
  };

  type BaseResponseListRegionMonitorAnalyzeVO_ = {
    code?: number;
    data?: RegionMonitorAnalyzeVO[];
    message?: string;
  };

  type BaseResponseListROIVO_ = {
    code?: number;
    data?: ROIVO[];
    message?: string;
  };

  type BaseResponseListString_ = {
    code?: number;
    data?: string[];
    message?: string;
  };

  type BaseResponseListStructAnalyzeVO_ = {
    code?: number;
    data?: StructAnalyzeVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type ChartVO = {
    brand?: string;
    date?: string;
    priceLevel?: string;
    region?: string;
    specification?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type CustomerAnalyzeVO = {
    brand?: string;
    customerCategory?: string;
    deliveryLimit?: number;
    orderQuantity?: number;
    orderRate?: number;
    priceLevel?: string;
    region?: string;
    salesChannel?: string;
    specification?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getStorageByBrandUsingGETParams = {
    /** brand */
    brand?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type PredictVO = {
    date?: string;
    sales?: number;
  };

  type Products = {
    brand?: string;
    current_stock?: number;
    id?: number;
    price?: number;
    price_level?: string;
    specification?: string;
  };

  type ProductsRequest = {
    brand?: string;
    current_stock?: number;
    id?: number;
    price?: number;
    price_level?: string;
    specification?: string;
  };

  type ProductsSearchRequest = {
    brand?: string;
    current_stock?: number;
    id?: number;
    maxPrice?: number;
    minPrice?: number;
    price_level?: string;
    specification?: string;
  };

  type RegionMonitorAnalyzeVO = {
    date?: string;
    isOver?: boolean;
    region?: string;
    totalOrderAmount?: number;
  };

  type ROIVO = {
    activityCost?: number;
    activityName?: string;
    endDate?: string;
    orderAmount?: number;
    roi?: number;
    startDate?: string;
  };

  type StructAnalyzeVO = {
    brand?: string;
    customerCategory?: string;
    orderQuantity?: number;
    priceLevel?: string;
    region?: string;
    salesChannel?: string;
    specification?: string;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
