//
//  BaseViewController.h
//  JKExpandTableViewSamples
//
//  Created by Harsh on 08/04/14.
//  Copyright (c) 2014 Jack Kwok. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <RevMobAds/RevMobAds.h>
@interface BaseViewController : UIViewController<UIWebViewDelegate, RevMobAdsDelegate>
{
    
}
@property (nonatomic, strong)RevMobBanner *bannerWindow;
@property (nonatomic, strong)RevMobBannerView *banner;
-(void)sideMenuClosed:(NSString *)withPathOfWebViewFile;

@end
