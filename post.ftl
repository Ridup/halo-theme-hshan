<#include "module/macro.ftl">
<@layout title="${post.title!options.blog_title}" keywords="${options.seo_keywords!}" description="${options.seo_description!}">
    <div id="page" class="site post-template">
        <div id="readProgress">
            <div class="read-progress-bar" role="progressbar" style="width: 0"></div>
        </div>
        <main class="site-main " id="siteMain">
            <div class="site-content">
                <article class="post tag-getting-started" id="siteContent">
                    <#--                    <div id="postHeader"></div>-->
                    <header class="bg-cover post-header" id="postHeader">
                        <#if post.thumbnail?? && post.thumbnail!=''>
                            <div class="cover-bg">
                                <img src="${post.thumbnail!}" alt="${post.title!}"/>
                            </div>
                        <#else>
                            <div class="default-cover-bg">
                            </div>
                        </#if>
                        <div class="cover-content">
                            <div class="inner">
                                <div class="post-tags">
                                    <#if post.tags?? && post.tags?size gt 0>
                                        <#list post.tags as tag>
                                            <a href="${context!}/tags/${tag.slugName!}">${tag.name!}
                                                &nbsp;&nbsp;&nbsp;</a>
                                        </#list>
                                    </#if>
                                </div>
                                <h1 class="post-title js-toc-ignore">${post.title}</h1>
                                <div class="post-meta">
                                    <span class="post-meta-wrap">
                                        <img class="author-avatar"
                                             srcset="${user.avatar!}, ${user.avatar!} 2x"
                                             src="${user.avatar!}" alt=""/>
                                        <span class="post-author">${post.visits} 次访问</span>
                                        <time class="published"
                                              datetime="${post.createTime?string("yyyy-MM-dd")}">${post.createTime?string("yyyy-MM-dd")}
                                        </time>
                                    </span>
                                    <div>${user.nickname!}</div>
                                </div>
                                <#if settings.enabled_visual_height!true>
                                    <a href="#post-content" class="arrow-down" data-scroll><span
                                                class="screen-reader-text">Scroll Down</span></a>
                                </#if>
                            </div>
                        </div>
                    </header>
                    <div class="post-inner">
                        <div class="article-body">
                            <div class="post-content article-content" id="post-content">
                                ${post.formatContent!}
                            </div>
                            <div id="tocFlag"></div>
                            <#if settings.post_toc!true>
                                <aside id="toc" class="toc"></aside>
                            </#if>
                        </div>
                        <div class="article-info" id="articleInfo">
                            <div class="extra-info extra-info-center">
                                <#if settings.QR_code_zfb?? || settings.QR_code_wx??>
                                    <button type="submit"
                                            class="appreciate-btn btn-primary font-bold rounded width-47 height-46 custom-color-solid-bg font-16-to-14"
                                            onclick="">
                                        <img src="${static!}/assets/media/images/cuplogo-sm.png"
                                             class="right-mrgn-8 support-img" style="height: 16px"/>
                                        <span id="">Support</span>
                                    </button>
                                </#if>
                                <#if settings.social_share!false>
                                    <button class="btn-primary btn-primary-light font-bold rounded width-47 height-46 custom-color-secondary-bg share-btn "
                                            onclick="">
                                        <span id="">Share</span>
                                    </button>
                                </#if>
                            </div>
                            <div class="social-share no-show" data-disabled="${settings.share_disabeld!''}"
                                 id="socialShare"></div>
                            <div class="article-copyright-info">
                                © 本文著作权归作者所有，转载前请务必署名
                            </div>

                            <#if is_post??>
                                <@comment post,"post" />
                            <#elseif is_sheet??>
                                <@comment sheet,"sheet" />
                            </#if>
                        </div>
                    </div>
                </article>

                <#if settings.post_nepre!true>
                    <nav class="post-navigation" id="post-navigation">
                        <h2 class="screen-reader-text">Post navigation</h2>
                        <div class="nav-links">
                            <#if prePost??>
                                <a href="${context!}/archives/${prePost.url!}" class="nav-previous">

                                    <#if prePost.thumbnail?? && prePost.thumbnail!=''>
                                        <div class="nav-bg ">
                                            <img src="${prePost.thumbnail!}" alt="${prePost.title!}"/>
                                        </div>
                                    <#else>
                                        <div class="nav-bg default-cover-bg">
                                        </div>
                                    </#if>
<#--                                    <div class="nav-bg"-->
<#--                                            <#if !(prePost.thumbnail?? && prePost.thumbnail!='')>-->
<#--                                                style="background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);"-->
<#--                                            </#if>-->
<#--                                    >-->

<#--                                        <img srcset="${prePost.thumbnail!} 300w, ${prePost.thumbnail!} 600w, ${prePost.thumbnail!} 800w, ${prePost.thumbnail!} 1600w, ${prePost.thumbnail!} 2000w"-->
<#--                                             sizes="(max-width: 800px) 100vw, 50vw" src="${prePost.thumbnail!}" alt=""-->
<#--                                        />-->

<#--                                    </div>-->
                                    <div class="nav-inside">
                                        <span class="nav-before">上一篇</span>
                                        <span class="nav-title">${prePost.title!}</span>
                                        <span class="nav-date"><time class="published"
                                                                     datetime="${prePost.createTime?string("yyyy-MM-dd")}">${prePost.createTime?string("yyyy-MM-dd")}
                                        </time></span>
                                    </div>
                                </a>
                            </#if>
                            <#if nextPost??>
                                <a href="${context!}/archives/${nextPost.url!}" class="nav-next">
                                    <#if nextPost.thumbnail?? && nextPost.thumbnail!=''>
                                        <div class="nav-bg ">
                                            <img src="${nextPost.thumbnail!}" alt="${nextPost.title!}"/>
                                        </div>
                                    <#else>
                                        <div class="nav-bg default-cover-bg">
                                        </div>
                                    </#if>
<#--                                    <div class="nav-bg"-->
<#--                                            <#if !(nextPost.thumbnail?? && nextPost.thumbnail!='')>-->
<#--                                                style="background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);"-->
<#--                                            </#if>-->
<#--                                    >-->

<#--                                        <img srcset="${nextPost.thumbnail!} 300w, ${nextPost.thumbnail!} 600w, ${nextPost.thumbnail!} 800w, ${nextPost.thumbnail!} 1600w, ${nextPost.thumbnail!} 2000w"-->
<#--                                             sizes="(max-width: 800px) 100vw, 50vw" src="${nextPost.thumbnail!}" alt=""-->
<#--                                        />-->

<#--                                    </div>-->
                                    <div class="nav-inside">
                                        <span class="nav-before">下一篇</span>
                                        <span class="nav-title">${nextPost.title!}</span>
                                        <span class="nav-date"><time class="published"
                                                                     datetime="${nextPost.createTime?string("yyyy-MM-dd")}">${nextPost.createTime?string("yyyy-MM-dd")}
                                        </time></span>
                                    </div>
                                </a>
                            </#if>
                        </div>
                    </nav>
                </#if>
            </div>
        </main>
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.7.0/dist/highlightjs-line-numbers.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/viewerjs@1.5.0/dist/viewer.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js"></script>
        <#--目录-->
        <#if settings.post_toc!true>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.min.js"></script>
        </#if>
        <script type="text/javascript">
            var gallery = new Viewer(document.getElementById('post-content'), {
                toolbar: false,
            });

            hljs.initHighlightingOnLoad();

            hljs.initLineNumbersOnLoad({singleLine: true});

            var displayReadProgress = <#if (settings.open_read_progress)??>${settings.open_read_progress?c}<#else>true</#if>;
            loadPost();
        </script>


        <div class="qr-code-wrap" role="dialog">
            <div role="document" class="qr-code" style="transform-origin: 201px 294px;">
        <span class="closinglayer"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em"
                                        height="1em" fill="currentColor" aria-hidden="true"><path
                        d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </span>
                <div style="text-align: center;padding: 10px 0;">
                    <#if settings.QR_code_zfb??>
                        <img class="qr_code_zfb" src="${settings.QR_code_zfb!}"/>
                    </#if>
                    <#if settings.QR_code_wx??>
                        <img class="qr_code_wx" src="${settings.QR_code_wx!}"/>
                    </#if>
                </div>
                <#if settings.QR_code_zfb?? && settings.QR_code_wx??>
                    <div class="switch-btn">
                        <span class="zfb-btn">支付宝</span>
                        <span class="wx-btn">微信</span>
                    </div>
                </#if>
            </div>
        </div>

        <style type="text/css">
            /* 阅读进度的进度条颜色 */
            #readProgress .read-progress-bar {
                background: ${settings.progress_color?default('#2474b5')} !important;
                height: 0.1875rem;
            }
        </style>
    </div>
</@layout>
