import React from "react";

const LegalNoticeView = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            LEGAL NOTICE
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            NovaSky Sàrl | Version 1.0 | Effective Date: 20 September 2026
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {/* Section 1 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">1. Company Information</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p><strong>NovaSky Sàrl</strong></p>
              <p>Swiss Limited Liability Company (Société à responsabilité limitée)</p>
              <p><strong>Company Registration Number (UID):</strong> CHE-289.629.413</p>
              <p><strong>Registered Office:</strong></p>
              <p>Route de la Maison Neuve 14<br />1753 Matran<br />Fribourg<br />Switzerland</p>
              <p><strong>Website:</strong> <a href="https://www.novasky.ch" className="text-primary hover:underline">https://www.novasky.ch</a></p>
              <p><strong>Managing Director:</strong> Abdoulaye Sow</p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">2. Contact Information</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p><strong>General Support:</strong> <a href="mailto:support@novasky.ch" className="text-primary hover:underline">support@novasky.ch</a></p>
              <p><strong>Business Partnerships:</strong> <a href="mailto:partnerships@novasky.ch" className="text-primary hover:underline">partnerships@novasky.ch</a></p>
              <p><strong>Telephone:</strong> +41 79 698 54 59</p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">3. Commercial Register</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>NovaSky Sàrl is duly registered with the Commercial Register of the Canton of Fribourg, Switzerland.</p>
              <p><strong>UID Number:</strong> CHE-289.629.413</p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">4. Regulatory Information</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>NovaSky Sàrl is a Swiss telecommunications and digital services company.</p>
              <p>The company may provide telecommunications-related services directly or through licensed partners and infrastructure providers, subject to applicable Swiss laws and regulatory requirements.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">5. Website Publisher</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>This website is owned, published, and operated by NovaSky Sàrl, a company incorporated under Swiss law and registered in the Commercial Register of the Canton of Fribourg under UID CHE-289.629.413.</p>
              <p>NovaSky Sàrl<br />Route de la Maison Neuve 14<br />1753 Matran<br />Fribourg<br />Switzerland</p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">6. Intellectual Property</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>All content published on this website, including but not limited to text, graphics, logos, icons, images, videos, designs, and software components, is the property of NovaSky Sàrl or its respective licensors and is protected by applicable intellectual property laws.</p>
              <p>No content may be copied, reproduced, distributed, modified, or used without prior written permission from NovaSky Sàrl.</p>
              <p>Any unauthorized use of NovaSky trademarks, trade names, branding elements, or website content is strictly prohibited.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">7. Disclaimer</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>The information provided on this website is for general informational purposes only.</p>
              <p>NovaSky Sàrl makes reasonable efforts to ensure the accuracy of the information published on this website. However, NovaSky does not guarantee that all information is complete, accurate, current, or free from errors.</p>
              <p>NovaSky reserves the right to modify website content at any time without prior notice.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">8. External Links</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>This website may contain links to third-party websites.</p>
              <p>NovaSky Sàrl has no control over the content or practices of external websites and assumes no responsibility for them.</p>
              <p>Access to third-party websites is at the user's own risk.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">9. Limitation of Liability</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>To the maximum extent permitted by applicable law, NovaSky Sàrl shall not be liable for indirect damages, loss of profits, business interruption, data loss, technical failures, or temporary website unavailability arising from the use of this website.</p>
              <p>NovaSky Sàrl does not warrant that the website will operate uninterrupted, securely, or free from viruses, malware, or other harmful components.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">10. Data Protection</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>NovaSky processes personal data in accordance with applicable Swiss data protection laws.</p>
              <p>For more information, please refer to our Privacy Policy: <a href="https://www.novasky.ch/privacy" className="text-primary hover:underline">https://www.novasky.ch/privacy</a></p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">11. Changes to These Legal Notices</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>NovaSky Sàrl reserves the right to update or modify these Legal Notices at any time.</p>
              <p>The latest version will always be available on this website.</p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">12. Governing Law</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>These Legal Notices shall be governed by and interpreted in accordance with the laws of Switzerland.</p>
              <p>Any disputes arising from the use of this website shall be subject to the jurisdiction of the competent courts of the Canton of Fribourg, Switzerland, unless mandatory law provides otherwise.</p>
            </div>
          </section>

          {/* Section 13 */}
          <section>
            <h3 className="text-xl font-bold text-gray-900">13. Contact</h3>
            <div className="mt-4 text-gray-600 space-y-2">
              <p><strong>NovaSky Sàrl</strong><br />Route de la Maison Neuve 14<br />1753 Matran<br />Fribourg<br />Switzerland</p>
              <p><strong>Support:</strong> <a href="mailto:support@novasky.ch" className="text-primary hover:underline">support@novasky.ch</a></p>
              <p><strong>Partnerships:</strong> <a href="mailto:partnerships@novasky.ch" className="text-primary hover:underline">partnerships@novasky.ch</a></p>
              <p><strong>Telephone:</strong> +41 79 698 54 59</p>
              <p><strong>Website:</strong> <a href="https://www.novasky.ch" className="text-primary hover:underline">https://www.novasky.ch</a></p>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default LegalNoticeView;
