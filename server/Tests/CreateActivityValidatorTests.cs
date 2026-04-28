using Application.Activities.Commands;
using Xunit;

namespace Tests;

public class CreateActivityValidatorTests
{
    private readonly CreateActivityValidator _validator = new();

    private static CreateActivity.Command BuildValidCommand() => new()
    {
        ActivityDto = new CreateActivityDto
        {
            Title = "Tokyo Language Meetup",
            Description = "Practice Japanese together",
            Date = DateTime.UtcNow.AddDays(7),
            Category = "culture",
            City = "Tokyo",
            Venue = "Shibuya Cafe",
            Latitude = 35.6595,
            Longitude = 139.7004
        }
    };

    [Fact]
    public void Should_Pass_Validation_For_Valid_Command()
    {
        var command = BuildValidCommand();

        var result = _validator.Validate(command);

        Assert.True(result.IsValid);
    }

    [Fact]
    public void Should_Fail_When_Title_Is_Empty()
    {
        var command = BuildValidCommand();
        command.ActivityDto.Title = "";

        var result = _validator.Validate(command);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.PropertyName.Contains("Title"));
    }

    [Fact]
    public void Should_Fail_When_Date_Is_In_The_Past()
    {
        var command = BuildValidCommand();
        command.ActivityDto.Date = DateTime.UtcNow.AddDays(-1);

        var result = _validator.Validate(command);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.PropertyName.Contains("Date"));
    }

    [Fact]
    public void Should_Fail_When_Latitude_Is_Out_Of_Range()
    {
        var command = BuildValidCommand();
        command.ActivityDto.Latitude = 200;

        var result = _validator.Validate(command);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.PropertyName.Contains("Latitude"));
    }
}
