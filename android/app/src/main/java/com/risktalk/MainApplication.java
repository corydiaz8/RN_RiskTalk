package com.ionicframework.risktalk438830;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.react.rnspinkit.RNSpinkitPackage;
import io.sentry.RNSentryPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.dooboolab.RNAudioRecorderPlayerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.wonday.pdf.RCTPdfView;
import com.swmansion.reanimated.ReanimatedPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSpinkitPackage(),
            new RNSentryPackage(),
            new RNFetchBlobPackage(),
            new RNFSPackage(),
            new ReactVideoPackage(),
            new SplashScreenReactPackage(),
            new RNAudioRecorderPlayerPackage(),
            new RNSoundPackage(),
            new GeolocationPackage(),
            new RNCardViewPackage(),
            new RCTPdfView(),
            new ReanimatedPackage(),
            new NetInfoPackage(),
            new ImagePickerPackage(),
            new ReactNativeAudioPackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new RNCWebViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
