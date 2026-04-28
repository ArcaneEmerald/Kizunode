using Application.Core;
using Xunit;

namespace Tests;

public class ResultTests
{
    [Fact]
    public void Success_Should_Return_IsSuccess_True_With_Value()
    {
        var result = Result<string>.Success("hello");

        Assert.True(result.IsSuccess);
        Assert.Equal("hello", result.Value);
        Assert.Null(result.Error);
    }

    [Fact]
    public void Failure_Should_Return_IsSuccess_False_With_Error_And_Code()
    {
        var result = Result<string>.Failure("Something went wrong", 400);

        Assert.False(result.IsSuccess);
        Assert.Equal("Something went wrong", result.Error);
        Assert.Equal(400, result.Code);
        Assert.Null(result.Value);
    }

    [Fact]
    public void Success_Should_Work_For_Value_Types()
    {
        var result = Result<int>.Success(42);

        Assert.True(result.IsSuccess);
        Assert.Equal(42, result.Value);
    }
}
