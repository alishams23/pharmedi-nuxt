<template>
    <div>
        <h1 class="irsa rtl">آگهی کارجویی</h1>

        <div class="container rtl">
            <div class="bg-white rounded-10 my-3 p-3 ">
                <h2 class="irsa">{{ job.title }}</h2>
                <br />
                <p class="irsa">{{ job.description }}</p>

                <hr class="hr mt-3 mb-1" />
                <p class="irsa text-xs">{{ job.jalali_time }}</p>

            </div>

            <div class="bg-white rounded-10 my-3 p-3">
                <p class="irsa">مکان</p>
                <hr class="hr mt-1 mb-3" />

                <div class="mb-2">
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.5"
                            d="M19.7165 20.3624C21.143 19.5846 22 18.5873 22 17.5C22 16.3475 21.0372 15.2961 19.4537 14.5C17.6226 13.5794 14.9617 13 12 13C9.03833 13 6.37738 13.5794 4.54631 14.5C2.96285 15.2961 2 16.3475 2 17.5C2 18.6525 2.96285 19.7039 4.54631 20.5C6.37738 21.4206 9.03833 22 12 22C15.1066 22 17.8823 21.3625 19.7165 20.3624Z"
                            fill="#1C274C" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                            fill="#1C274C" />
                    </svg>
                    {{ job.city.city_name }}
                </div>
            </div>

            <div class="bg-white rounded-10 my-3 p-3">
                <p class="irsa">راه های ارتباطی</p>
                <hr class="hr mt-1 mb-3" />

                <div class="mb-2" v-if="job.phone_number">
                    <a class="irsa" :href="'tel:+98' + job.phone_number">
                        <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"
                                fill="#1C274C" />
                        </svg>
                        0{{ job.phone_number }}
                    </a>
                </div>

                <div class="mb-2" v-if="job.sms_number">
                    <a class="irsa" :href="'sms:+98' + job.sms_number">
                        <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
                                fill="#292D32" />
                        </svg>
                        0{{ job.sms_number }}
                    </a>
                </div>

                <div class="mb-2" v-if="job.telegram_id">
                    <a class="irsa rtl" :href="'https://t.me/' + job.telegram_id">
                        <svg width="22px" height="22px" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)" />
                            <path
                                d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z"
                                fill="white" />
                            <defs>
                                <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#37BBFE" />
                                    <stop offset="1" stop-color="#007DBB" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {{ job.telegram_id }}@
                    </a>
                </div>

                <div v-if="job.whatsapp_number">
                    <a class="irsa" :href="'https://wa.me/' + job.whatsapp_number">
                        <svg width="20px" height="20px" viewBox="0 0 48 48" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E">
                                    <path
                                        d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z"
                                        id="Whatsapp">
                                    </path>
                                </g>
                            </g>
                        </svg>
                        0{{ job.whatsapp_number }}
                    </a>
                </div>

                <hr class="hr mt-2 mb-2" />

                <button class="drop-list__btn py-2">
                    <div @click="shareLink()"
                        class="d-flex mx-3 justify-content-between align-items-center text-blue-500" href>
                        <i class="fa fa-share"></i>

                        <div class="text-sm">اشتراک گذاری</div>
                    </div>
                </button>


            </div>

        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ route }) {
        const job = await fetch(
            `https://pharmedi.ir/api/job/job-retrieve/${route.query.job}/`
        ).then((response) => response.json());

        return {
            job,
        };
    },
    head() {
        if (this.job) {
            return {
                meta: [
                    {
                        hid: 'og:title',
                        name: this.job.title,
                        description: this.job.description,
                    },
                ],
            };
        } else {
            return {
                meta: [
                    {
                        hid: 'og:description',
                        name: 'Pharmedi',
                        description: 'Default description',
                    },
                ],
            };
        }
    },

    mounted() {
        if (this.$route.query.job) {
            // this.jobData();
        } else {
            this.$router.push('/t/Home');
        }
    },
    methods: {
        async jobData() {
            this.loading = true;

            this.loading = false;
        },
        copyToClipboard(textToCopy) {
            // navigator clipboard api needs a secure context (https)
            if (navigator.clipboard && window.isSecureContext) {
                // navigator clipboard api method'
                return navigator.clipboard.writeText(textToCopy);
            } else {
                // text area method
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                // make the textarea out of viewport
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                // eslint-disable-next-line promise/param-names
                return new Promise((res, rej) => {
                    // here the magic happens
                    // eslint-disable-next-line prefer-promise-reject-errors
                    document.execCommand("copy") ? res() : rej();
                    textArea.remove();
                });
            }
        },
        shareLink() {
            this.copyToClipboard(window.location.href);
            alert(" کپی شد.");
        },
    },
};
</script>