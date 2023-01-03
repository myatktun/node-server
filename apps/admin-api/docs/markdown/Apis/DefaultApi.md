# DefaultApi

All URIs are relative to *http://admin-api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addBooks**](DefaultApi.md#addBooks) | **POST** /books | Add multiple books |
| [**login**](DefaultApi.md#login) | **POST** /login | Authenticate user |
| [**signup**](DefaultApi.md#signup) | **POST** /signup | Authenticate user |


<a name="addBooks"></a>
# **addBooks**
> BooksAddedResponse addBooks(Books\_inner)

Add multiple books

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Books\_inner** | [**List**](../Models/Books_inner.md)|  | |

### Return type

[**BooksAddedResponse**](../Models/BooksAddedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="login"></a>
# **login**
> LoginResponse login(Credentials)

Authenticate user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Credentials** | [**Credentials**](../Models/Credentials.md)|  | |

### Return type

[**LoginResponse**](../Models/LoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="signup"></a>
# **signup**
> UserCreatedResponse signup(CreateUser)

Authenticate user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **CreateUser** | [**CreateUser**](../Models/CreateUser.md)|  | |

### Return type

[**UserCreatedResponse**](../Models/UserCreatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

