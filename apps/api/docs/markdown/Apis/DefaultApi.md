# DefaultApi

All URIs are relative to *http://CONTAINER_NAME/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAuthor**](DefaultApi.md#getAuthor) | **GET** /authors/{_id} | Get single Author |
| [**getAuthors**](DefaultApi.md#getAuthors) | **GET** /authors | Get Authors |
| [**getBook**](DefaultApi.md#getBook) | **GET** /books/{_id} | Get single Book |
| [**getBooks**](DefaultApi.md#getBooks) | **GET** /books | Get Books |
| [**getNote**](DefaultApi.md#getNote) | **GET** /notes/{_id} | Get single Note |
| [**getNotes**](DefaultApi.md#getNotes) | **GET** /notes | Get Notes |


<a name="getAuthor"></a>
# **getAuthor**
> singleAuthor getAuthor(\_id)

Get single Author

    Get a single Author

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **\_id** | [**Author**](../Models/.md)|  | [default to null] |

### Return type

[**singleAuthor**](../Models/singleAuthor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getAuthors"></a>
# **getAuthors**
> Authors getAuthors(page, limitPerPage)

Get Authors

    Get all authors

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | **Integer**| This is used to get specific page | [optional] [default to null] |
| **limitPerPage** | **Integer**| This is used to request specific amount of results in a single page | [optional] [default to null] |

### Return type

[**Authors**](../Models/Authors.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getBook"></a>
# **getBook**
> singleBook getBook(\_id)

Get single Book

    Get a single book

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **\_id** | [**Book**](../Models/.md)|  | [default to null] |

### Return type

[**singleBook**](../Models/singleBook.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getBooks"></a>
# **getBooks**
> Books getBooks(status, page, limitPerPage)

Get Books

    Get all books

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **status** | **String**| This is used to filter books returned by their status | [optional] [default to null] |
| **page** | **Integer**| This is used to get specific page | [optional] [default to null] |
| **limitPerPage** | **Integer**| This is used to request specific amount of results in a single page | [optional] [default to null] |

### Return type

[**Books**](../Models/Books.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getNote"></a>
# **getNote**
> singleNote getNote(\_id)

Get single Note

    Get a single Note

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **\_id** | [**Author**](../Models/.md)|  | [default to null] |

### Return type

[**singleNote**](../Models/singleNote.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getNotes"></a>
# **getNotes**
> Notes getNotes(page, limitPerPage)

Get Notes

    Get all notes

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | **Integer**| This is used to get specific page | [optional] [default to null] |
| **limitPerPage** | **Integer**| This is used to request specific amount of results in a single page | [optional] [default to null] |

### Return type

[**Notes**](../Models/Notes.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

