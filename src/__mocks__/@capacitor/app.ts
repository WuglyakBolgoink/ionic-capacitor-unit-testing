export declare type URLOpenListener = (event: URLOpenListenerEvent) => void;
export interface AppState {
  /**
   * Whether the app is active or not.
   *
   * @since 1.0.0
   */
  isActive: boolean;
}
export interface URLOpenListenerEvent {
  /**
   * The URL the app was opened with.
   *
   * @since 1.0.0
   */
  url: string;
  /**
   * The source application opening the app (iOS only)
   * https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication
   *
   * @since 1.0.0
   */
  iosSourceApplication?: any;
  /**
   * Whether the app should open the passed document in-place
   * or must copy it first.
   * https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace
   *
   * @since 1.0.0
   */
  iosOpenInPlace?: boolean;
}
export interface RestoredListenerEvent {
  /**
   * The pluginId this result corresponds to. For example, `Camera`.
   *
   * @since 1.0.0
   */
  pluginId: string;
  /**
   * The methodName this result corresponds to. For example, `getPhoto`
   *
   * @since 1.0.0
   */
  methodName: string;
  /**
   * The result data passed from the plugin. This would be the result you'd
   * expect from normally calling the plugin method. For example, `CameraPhoto`
   *
   * @since 1.0.0
   */
  data?: any;
  /**
   * Boolean indicating if the plugin call succeeded.
   *
   * @since 1.0.0
   */
  success: boolean;
  /**
   * If the plugin call didn't succeed, it will contain the error message.
   *
   * @since 1.0.0
   */
  error?: {
    message: string;
  };
}
export interface BackButtonListenerEvent {
  /**
   * Indicates whether the browser can go back in history.
   * False when the history stack is on the first entry.
   *
   * @since 1.0.0
   */
  canGoBack: boolean;
}

export const App = {
  removeAllListeners: async (): Promise<void> => {
  },
  addListener: async (eventName: 'appUrlOpen', listenerFunc: URLOpenListener): Promise<void> => {
  },
};
