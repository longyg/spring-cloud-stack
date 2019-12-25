package com.yglong.zuul.filters;

import com.netflix.zuul.context.RequestContext;
import org.springframework.stereotype.Component;

@Component
public class FilterUtils {
    public static final String PRE_FILTER_TYPE = "pre";
    public static final String POST_FILTER_TYPE = "post";
    public static final String CORRECTION_ID = "correlation-id";

    public String getCorrelationId() {
        RequestContext ctx = RequestContext.getCurrentContext();
        if (ctx.getRequest().getHeader(CORRECTION_ID) != null) {
            return ctx.getRequest().getHeader(CORRECTION_ID);
        } else {
            return ctx.getZuulRequestHeaders().get(CORRECTION_ID);
        }
    }

    public void setCorrectionId(String correctionId) {
        RequestContext ctx = RequestContext.getCurrentContext();
        ctx.addZuulRequestHeader(CORRECTION_ID, correctionId);
    }
}
