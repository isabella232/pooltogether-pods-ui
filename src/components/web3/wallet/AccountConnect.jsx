import { useEffect, useMemo } from "react";
import { useEthers, useChainState } from "@usedapp/core";

import { injected } from "@connectors";

/**
 * @name AccountConnect
 * @param {Object} props
 */
export const AccountConnect = ({
  className,
  classNameChildren,
  children,
  ...props
}) => {
  const { activateBrowserWallet, account, activate, library } = useEthers();

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected);
      }
    });
  }, [activate]);

  return useMemo(() => {
    return (
      <>
        {account ? (
          <div className={classNameChildren}>{children[1]}</div>
        ) : (
          <span>
            {children[0]}
            {/* Connect to Application */}
          </span>
        )}
      </>
    );
  }, [account]);
};
export default AccountConnect;
