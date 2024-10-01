export const verifyRoles = (payload: { role: any; }, ...allowedRoles: any[]) => {
    if (payload && payload.role) {
      const userRoles = Array.isArray(payload.role) ? payload.role : [payload.role];
      const isAuthorized = userRoles.some(role => allowedRoles.includes(role));
  
      if (isAuthorized) {
        return { authorized: true };
      } else {
        return { authorized: false, reason: 'Unauthorized: Insufficient role' };
      }
    } else {
      return { authorized: false, reason: 'Unauthorized: No role found' };
    }
  };