//
//  BaseViewController.m
//  JKExpandTableViewSamples
//
//  Created by Harsh on 08/04/14.
//  Copyright (c) 2014 Jack Kwok. All rights reserved.
//

#import "BaseViewController.h"
#import "MVYSideMenuController.h"

@interface BaseViewController ()
- (IBAction)openMenu:(id)sender;
@property (nonatomic) IBOutlet UIWebView *webView;

@end

@implementation BaseViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(notificationCalled:)
                                                 name:@"slideMenuChildClicked"
                                               object:nil];
    
    self.webView.delegate = self;
    self.webView.scrollView.bounces = NO;
    //[self sideMenuClosed:@"hextris-o"];
    [self sideMenuClosed:@"hextris"];
    
    CGRect r = [[UIScreen mainScreen] bounds];
    self.banner = [[RevMobAds session] bannerView];
    
    [self.banner loadWithSuccessHandler:^(RevMobBannerView *banner) {
        [banner setFrame:CGRectMake(0, r.size.height - 95, r.size.width, 50)];
        [self.view addSubview:banner];
        [self revmobAdDidReceive];
    } andLoadFailHandler:^(RevMobBannerView *banner, NSError *error) {
        [self revmobAdDidFailWithError:error];
    } onClickHandler:^(RevMobBannerView *banner) {
        [self revmobUserClickedInTheAd];
    }];
    
}
- (void)viewDidAppear:(BOOL)animated
{

}
- (void)revmobAdDidFailWithError:(NSError *)error {

    NSLog(@"Ad failed with error: %@", error);
}

- (void)revmobAdDidReceive {

    
    NSLog(@"Ad loaded successfullly");
}

- (void)revmobAdDisplayed {
    NSLog(@"Ad displayed");
}

- (void)revmobUserClickedInTheAd {
    NSLog(@"User clicked in the ad");
}

- (void)revmobUserClosedTheAd {
    NSLog(@"User closed the ad");
}
-(void)sideMenuClosed:(NSString *)withPathOfWebViewFile;
{
    NSURL *url = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:withPathOfWebViewFile]];
    [self.webView loadRequest:[NSURLRequest requestWithURL:url]];
}

- (void) notificationCalled:(NSNotification *) notification
{
    if ([[notification name] isEqualToString:@"slideMenuChildClicked"])
        [self sideMenuClosed:[notification object]];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)openMenu:(id)sender {
    
	MVYSideMenuController *sideMenuController = [self sideMenuController];
	if (sideMenuController) {
		[sideMenuController openMenu];
	}
}
@end
