//
//  main.m
//  testhttp
//
//  Created by littest on 14/12/18.
//  Copyright (c) 2014年 littest. All rights reserved.
//
#define  MY_XIAOMI  93f1dc88b6326bf00db25c7e7163930b
#define MY_5C      92e52b79fc57c25ef504dc9e983ecb17a4f081a146e60636ca995de41e2aa82a
#define MY_JPUSH_XIMI  07020f2aa48
#define MY_IPAD 57185921673ee1bba1a238a88624faf55f71725cc8b0354390b40dbff1caaff8

#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSLog(@"Hello, World!");
        
        NSURL *url = [NSURL URLWithString:@"http://www.kkk885.cn/send"];
        
        //第二步，创建请求
        
        NSMutableURLRequest *request = [[NSMutableURLRequest alloc]initWithURL:url cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:10];
        
        [request setHTTPMethod:@"POST"];//设置请求方式为POST，默认为GET
        
        NSString *str =@"msgid=4&userid=['92e52b79fc57c25ef504dc9e983ecb17a4f081a146e60636ca995de41e2aa82a']&message=哦也&msgtype=txt&deviceSysType=ios\
&sound=dudu.m4a";
     //设置参数
        
        NSData *data = [str dataUsingEncoding:NSUTF8StringEncoding];
    
        [request setHTTPBody:data];
        
        //第三步，连接服务器
        
        
        
        NSData *received = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
        
        
        
        NSString *str1 = [[NSString alloc]initWithData:received encoding:NSUTF8StringEncoding];
        
        
        
        NSLog(@"%@",str1);
    }
    return 0;
}
