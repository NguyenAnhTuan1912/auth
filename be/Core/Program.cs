using System;
using Microsoft.EntityFrameworkCore;
using Core.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Configure DB Connection.
builder.Services.AddDbContext<MainDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("MainDBConnStr"));
});

// Configure cors
builder.Services.AddCors(option => {
    option.AddPolicy("MyPolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("MyPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
