
```
AOL---TOLONGIN---FULLSTACK-main
├─ .emergent
│  └─ emergent.yml
├─ AUDIT_REPORT.md
├─ backend
│  ├─ .dockerignore
│  ├─ .prettierrc
│  ├─ docker-entrypoint.sh
│  ├─ Dockerfile
│  ├─ eslint.config.mjs
│  ├─ nest-cli.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prisma
│  │  ├─ migrations
│  │  │  ├─ 20260627195214_init
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20260628120000_money_as_integer
│  │  │  │  └─ migration.sql
│  │  │  └─ migration_lock.toml
│  │  ├─ schema.prisma
│  │  └─ seed.ts
│  ├─ prisma.config.ts.backup
│  ├─ README.md
│  ├─ src
│  │  ├─ app.module.ts
│  │  ├─ common
│  │  │  ├─ common.module.ts
│  │  │  ├─ constants
│  │  │  │  └─ enums.ts
│  │  │  ├─ decorators
│  │  │  │  ├─ current-user.decorator.ts
│  │  │  │  ├─ public.decorator.ts
│  │  │  │  └─ roles.decorator.ts
│  │  │  ├─ filters
│  │  │  │  └─ http-exception.filter.ts
│  │  │  ├─ guards
│  │  │  │  ├─ jwt-auth.guard.ts
│  │  │  │  ├─ roles.guard.ts
│  │  │  │  └─ verification.guards.ts
│  │  │  ├─ interceptors
│  │  │  │  └─ logging.interceptor.ts
│  │  │  ├─ middleware
│  │  │  │  └─ request-id.middleware.ts
│  │  │  ├─ pipes
│  │  │  │  ├─ trim.pipe.spec.ts
│  │  │  │  └─ trim.pipe.ts
│  │  │  ├─ services
│  │  │  │  ├─ audit-log.service.ts
│  │  │  │  └─ token-blacklist.service.ts
│  │  │  └─ utils
│  │  │     ├─ cors.ts
│  │  │     └─ helpers.ts
│  │  ├─ compat
│  │  │  ├─ compat.controller.ts
│  │  │  └─ compat.module.ts
│  │  ├─ config
│  │  │  ├─ app.config.ts
│  │  │  └─ environment.validation.ts
│  │  ├─ integrations
│  │  │  ├─ email
│  │  │  │  ├─ email.interface.ts
│  │  │  │  └─ mock-email.service.ts
│  │  │  ├─ integrations.module.ts
│  │  │  ├─ payment
│  │  │  │  ├─ mock-payment.service.ts
│  │  │  │  └─ payment.interface.ts
│  │  │  ├─ sms
│  │  │  │  ├─ mock-sms.service.ts
│  │  │  │  └─ sms.interface.ts
│  │  │  └─ storage
│  │  │     ├─ mock-storage.service.ts
│  │  │     └─ storage.interface.ts
│  │  ├─ main.ts
│  │  ├─ modules
│  │  │  ├─ admin
│  │  │  │  ├─ admin.module.ts
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ admin.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ admin.dto.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ admin.repository.ts
│  │  │  │  └─ services
│  │  │  │     └─ admin.service.ts
│  │  │  ├─ applications
│  │  │  │  ├─ applications.module.ts
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ applications.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ application.dto.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ applications.repository.ts
│  │  │  │  └─ services
│  │  │  │     └─ applications.service.ts
│  │  │  ├─ auth
│  │  │  │  ├─ auth.module.ts
│  │  │  │  ├─ controllers
│  │  │  │  │  ├─ auth.controller.ts
│  │  │  │  │  └─ verification.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ login.dto.ts
│  │  │  │  │  ├─ password.dto.ts
│  │  │  │  │  └─ register.dto.ts
│  │  │  │  ├─ interfaces
│  │  │  │  │  └─ auth.interface.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ auth.repository.ts
│  │  │  │  ├─ services
│  │  │  │  │  └─ auth.service.ts
│  │  │  │  └─ strategies
│  │  │  │     └─ jwt.strategy.ts
│  │  │  ├─ categories
│  │  │  │  ├─ categories.module.ts
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ categories.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ category.dto.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ categories.repository.ts
│  │  │  │  └─ services
│  │  │  │     └─ categories.service.ts
│  │  │  ├─ chat
│  │  │  │  ├─ chat.module.ts
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ chat.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ chat.dto.ts
│  │  │  │  ├─ gateways
│  │  │  │  │  └─ chat.gateway.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ chat.repository.ts
│  │  │  │  └─ services
│  │  │  │     └─ chat.service.ts
│  │  │  ├─ disputes
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ disputes.controller.ts
│  │  │  │  ├─ disputes.module.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ dispute.dto.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ disputes.repository.ts
│  │  │  │  └─ services
│  │  │  │     └─ disputes.service.ts
│  │  │  ├─ jobs
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ jobs.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ job.dto.ts
│  │  │  │  ├─ factories
│  │  │  │  │  └─ job.factory.ts
│  │  │  │  ├─ jobs.module.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ jobs.repository.ts
│  │  │  │  └─ services
│  │  │  │     └─ jobs.service.ts
│  │  │  ├─ notifications
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ notifications.controller.ts
│  │  │  │  ├─ notifications.gateway.ts
│  │  │  │  ├─ notifications.module.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ notifications.repository.ts
│  │  │  │  └─ services
│  │  │  │     └─ notifications.service.ts
│  │  │  ├─ orders
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ orders.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ order.dto.ts
│  │  │  │  ├─ factories
│  │  │  │  │  └─ order.factory.ts
│  │  │  │  ├─ orders.module.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ orders.repository.ts
│  │  │  │  └─ services
│  │  │  │     ├─ orders-tasks.service.ts
│  │  │  │     ├─ orders.service.spec.ts
│  │  │  │     └─ orders.service.ts
│  │  │  ├─ payments
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ payments.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ payment.dto.ts
│  │  │  │  ├─ payments.module.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ payments.repository.ts
│  │  │  │  └─ services
│  │  │  │     └─ payments.service.ts
│  │  │  ├─ reviews
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ reviews.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ review.dto.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ reviews.repository.ts
│  │  │  │  ├─ reviews.module.ts
│  │  │  │  └─ services
│  │  │  │     └─ reviews.service.ts
│  │  │  ├─ services
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ services.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  └─ service.dto.ts
│  │  │  │  ├─ factories
│  │  │  │  │  └─ service.factory.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ services.repository.ts
│  │  │  │  ├─ services
│  │  │  │  │  └─ services.service.ts
│  │  │  │  └─ services.module.ts
│  │  │  ├─ simulation
│  │  │  │  ├─ simulation.module.ts
│  │  │  │  └─ simulation.service.ts
│  │  │  ├─ uploads
│  │  │  │  ├─ uploads.controller.ts
│  │  │  │  └─ uploads.module.ts
│  │  │  ├─ users
│  │  │  │  ├─ controllers
│  │  │  │  │  └─ users.controller.ts
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ portfolio.dto.ts
│  │  │  │  │  └─ update-user.dto.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  └─ users.repository.ts
│  │  │  │  ├─ services
│  │  │  │  │  └─ users.service.ts
│  │  │  │  └─ users.module.ts
│  │  │  └─ withdrawals
│  │  │     ├─ controllers
│  │  │     │  └─ withdrawals.controller.ts
│  │  │     ├─ dto
│  │  │     │  └─ withdrawal.dto.ts
│  │  │     ├─ repositories
│  │  │     │  └─ withdrawals.repository.ts
│  │  │     ├─ services
│  │  │     │  └─ withdrawals.service.ts
│  │  │     └─ withdrawals.module.ts
│  │  └─ prisma
│  │     ├─ prisma.module.ts
│  │     └─ prisma.service.ts
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tests
│  │  ├─ backend_test.py
│  │  ├─ iteration_fixes_test.py
│  │  ├─ test_iteration4_retest.py
│  │  ├─ test_iteration6_uploads_reviews.py
│  │  ├─ test_iteration_review.py
│  │  └─ test_review_request.py
│  ├─ tsconfig.build.json
│  ├─ tsconfig.json
│  └─ uploads
│     ├─ avatars
│     │  ├─ 18f408be-075c-458d-866f-c09ef93cfcc8.png
│     │  ├─ 1d05ba86-7d61-452f-8764-50b077b45536.png
│     │  ├─ 4b13cdb7-7ec8-4463-9f6a-0e8369b69b79.png
│     │  ├─ 55c22687-eddf-4906-b8a6-e6ca2f9ac711.png
│     │  ├─ 88332b1d-1128-4277-a434-252ef3a1ec7e.png
│     │  └─ a7ad39bd-9859-4395-a361-9545d0ec2890.png
│     ├─ general
│     │  ├─ 4b259f59-738c-4af7-bcba-c5798d6c907c.png
│     │  ├─ a0755a88-fbe9-4dd5-a6fd-5ba8b6a82f0a.png
│     │  └─ a4a38557-b111-4b41-8d51-f2ca3fc09a0b.png
│     └─ services
│        └─ 97277b6d-0aa4-4afb-bab3-80085d3788d0.png
├─ CHANGELOG.md
├─ DEPLOYMENT.md
├─ FIX_REPORT.md
├─ frontend
│  ├─ .eslintrc.json
│  ├─ Dockerfile
│  ├─ eslint.config.js
│  ├─ generate.js
│  ├─ index.html
│  ├─ nginx.conf
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  ├─ logotolongin.png
│  │  ├─ logotolongin.png.jpeg
│  │  └─ logotolongin.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ app
│  │  │  ├─ App.js
│  │  │  ├─ layout.js
│  │  │  ├─ router.js
│  │  │  └─ store.js
│  │  ├─ assets
│  │  │  ├─ hero.png
│  │  │  └─ vite.svg
│  │  ├─ features
│  │  │  ├─ admin
│  │  │  │  └─ AdminPages.js
│  │  │  ├─ auth
│  │  │  │  └─ pages
│  │  │  │     ├─ AuthPages.js
│  │  │  │     └─ LoginPage.js
│  │  │  ├─ chat
│  │  │  │  └─ ChatPages.js
│  │  │  ├─ dashboard
│  │  │  │  └─ DashboardPages.js
│  │  │  ├─ home
│  │  │  │  └─ HomePage.js
│  │  │  ├─ jobs
│  │  │  │  └─ JobsPages.js
│  │  │  ├─ marketplace
│  │  │  │  ├─ MarketplacePages.js
│  │  │  │  └─ PostServicePage.js
│  │  │  ├─ notifications
│  │  │  │  ├─ NotificationsPage.js
│  │  │  │  └─ NotificationsPanel.js
│  │  │  ├─ orders
│  │  │  │  └─ OrdersPages.js
│  │  │  ├─ profile
│  │  │  │  ├─ KycPage.js
│  │  │  │  ├─ ProfilePages.js
│  │  │  │  └─ PublicProfilePage.js
│  │  │  └─ verification
│  │  │     └─ VerificationPage.js
│  │  ├─ main.js
│  │  ├─ shared
│  │  │  ├─ ui
│  │  │  │  └─ components.js
│  │  │  └─ utils
│  │  │     ├─ api.js
│  │  │     ├─ helpers.js
│  │  │     ├─ i18n.js
│  │  │     ├─ notifications-ws.js
│  │  │     ├─ upload-widget.js
│  │  │     ├─ uploads.js
│  │  │     └─ ws.js
│  │  └─ styles
│  │     └─ main.css
│  ├─ vercel.json
│  └─ vite.config.js
├─ memory
│  └─ PRD.md
├─ README.md
└─ test_result.md

```