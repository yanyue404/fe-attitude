const HoC = (WrappedComponent, LoginView) => {
  const WrappingComponent = () => {
    const { user } = this.props;
    if (user) {
      return <WrappedComponent {...this.props} />;
    } else {
      return <LoginView {...this.props} />;
    }
  };
  return WrappingComponent;
};
